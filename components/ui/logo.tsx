export function Logo({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <img 
      src="/logo.png" 
      alt="P2C Growth Logo" 
      className={`${className} object-contain`}
    />
  );
}
