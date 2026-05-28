$ErrorActionPreference = 'Stop'

$Repo = 'opswat-eng/ai-playbook'
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$CargoHome = if ($env:CARGO_HOME) { $env:CARGO_HOME } else { Join-Path $HOME '.cargo' }
$CargoBinDir = Join-Path $CargoHome 'bin'
$ManagedPathMarker = 'vms-sync installer PATH setup'

function Test-WindowsHost {
    return [System.Runtime.InteropServices.RuntimeInformation]::IsOSPlatform(
        [System.Runtime.InteropServices.OSPlatform]::Windows
    )
}

function Ensure-WindowsHost {
    if (-not (Test-WindowsHost)) {
        throw 'install.ps1 only supports Windows. Use install.sh on macOS or Linux.'
    }
}

function Ensure-CargoBinInProcessPath {
    if (-not ($env:Path -split ';' | Where-Object { $_ -eq $CargoBinDir })) {
        $env:Path = "$CargoBinDir;$env:Path"
    }
}

function Install-RustIfMissing {
    if (Get-Command cargo -ErrorAction SilentlyContinue) {
        return
    }

    Write-Host 'Rust/Cargo is not installed. Automatically installing via rustup...'
    $rustupPath = Join-Path ([System.IO.Path]::GetTempPath()) 'rustup-init.exe'
    Invoke-WebRequest -Uri 'https://win.rustup.rs/x86_64' -OutFile $rustupPath
    & $rustupPath -y | Out-Null
    Ensure-CargoBinInProcessPath

    if (-not (Get-Command cargo -ErrorAction SilentlyContinue)) {
        throw 'Failed to install or configure Rust automatically. Please install it manually from https://rustup.rs/.'
    }
}

function Persist-CargoBinForFuturePowerShellSessions {
    $currentUserPath = [Environment]::GetEnvironmentVariable('Path', 'User')
    $pathEntries = @()
    if ($currentUserPath) {
        $pathEntries = $currentUserPath -split ';' | Where-Object { $_ }
    }

    if (-not ($pathEntries | Where-Object { $_ -eq $CargoBinDir })) {
        $newUserPath = if ($currentUserPath) { "$CargoBinDir;$currentUserPath" } else { $CargoBinDir }
        [Environment]::SetEnvironmentVariable('Path', $newUserPath, 'User')
    }

    $profileDir = Split-Path -Parent $PROFILE.CurrentUserCurrentHost
    New-Item -ItemType Directory -Force -Path $profileDir | Out-Null
    if (-not (Test-Path $PROFILE.CurrentUserCurrentHost)) {
        New-Item -ItemType File -Force -Path $PROFILE.CurrentUserCurrentHost | Out-Null
    }

    $profileContent = Get-Content -Path $PROFILE.CurrentUserCurrentHost -Raw
    if ($profileContent -notmatch [regex]::Escape($ManagedPathMarker)) {
        Add-Content -Path $PROFILE.CurrentUserCurrentHost -Value @"

# $ManagedPathMarker
if (-not (`$env:Path -split ';' | Where-Object { `$_ -eq '$CargoBinDir' })) {
    `$env:Path = '$CargoBinDir;' + `$env:Path
}
"@
    }
}

function Verify-VmsSyncAvailable {
    $command = "Get-Command vms-sync | Select-Object -ExpandProperty Source"
    $resolved = powershell -NoProfile -Command $command 2>$null
    if ($LASTEXITCODE -eq 0 -and $resolved) {
        return
    }

    if (-not (Get-Command vms-sync -ErrorAction SilentlyContinue)) {
        throw 'vms-sync was installed but is not available on PATH in a fresh PowerShell session.'
    }
}

function Install-VmsSync {
    param(
        [Parameter(Mandatory = $true)]
        [string] $InstallPath
    )

    & cargo install --path $InstallPath
    Persist-CargoBinForFuturePowerShellSessions
    Ensure-CargoBinInProcessPath
    Verify-VmsSyncAvailable
}

Ensure-WindowsHost
Install-RustIfMissing
Ensure-CargoBinInProcessPath

if (Test-Path (Join-Path $ScriptDir 'Cargo.toml')) {
    Write-Host 'Installing vms-sync globally from local path...'
    Install-VmsSync -InstallPath $ScriptDir
    Write-Host ''
    Write-Host 'vms-sync successfully installed to your Cargo bin directory!'
    Write-Host 'You can now run ''vms-sync'' from a new PowerShell session.'
    exit 0
}

if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
    throw "'gh' CLI not found. Install from https://cli.github.com/ and authenticate to continue."
}

$tmpDir = Join-Path ([System.IO.Path]::GetTempPath()) ("vms-sync-" + [System.Guid]::NewGuid().ToString('N'))
New-Item -ItemType Directory -Force -Path $tmpDir | Out-Null

try {
    Write-Host "Cloning $Repo to a temporary directory to install vms-sync..."
    & gh repo clone $Repo $tmpDir -- --depth 1

    Write-Host 'Installing vms-sync globally...'
    Install-VmsSync -InstallPath (Join-Path $tmpDir 'teams-to-share/vms/install')
    Write-Host ''
    Write-Host 'vms-sync successfully installed to your Cargo bin directory!'
    Write-Host 'You can now run ''vms-sync'' from a new PowerShell session.'
}
finally {
    Remove-Item -Recurse -Force $tmpDir -ErrorAction SilentlyContinue
}
