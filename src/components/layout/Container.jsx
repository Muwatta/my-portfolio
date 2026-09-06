export const Container = ({ children, className = "", size = "default" }) => {
  const sizes = {
    sm: "max-w-3xl",
    default: "max-w-6xl",
    lg: "max-w-7xl",
    full: "max-w-none",
  };

  return (
    <div
      className={`container mx-auto w-full px-4 sm:px-6 lg:px-8 ${sizes[size]} ${className}`}
    >
      {children}
    </div>
  );
};
