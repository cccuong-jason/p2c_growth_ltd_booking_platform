use vms_sync::models::AppError;

fn main() -> Result<(), AppError> {
    vms_sync::run_app()
}
