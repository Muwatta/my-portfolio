export const Container = ({ children, className = "", size = "default" }) => {
  const sizes = {
    sm: "max-w-3xl",
    default: "max-w-6xl",
    lg: "max-w-7xl",
    full: "max-w-none",
  };

  return (
    <div
      className={`container mx-auto px-4 md:px-6 ${sizes[size]} ${className}`}
    >
      {children}
    </div>
  );
};
