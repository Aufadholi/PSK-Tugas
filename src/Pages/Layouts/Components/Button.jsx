const variantClasses = {
  primary: "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white",
  secondary: "bg-gradient-to-r from-gray-600 via-gray-400 to-gray-200 hover:from-gray-700 hover:via-gray-500 hover:to-gray-300 text-gray-900",
  warning: "bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 hover:from-yellow-500 hover:via-orange-500 hover:to-red-500 text-white",
  info: "bg-gradient-to-r from-cyan-400 via-teal-400 to-green-400 hover:from-cyan-500 hover:via-teal-500 hover:to-green-500 text-white",
  danger: "bg-gradient-to-r from-red-500 via-pink-500 to-orange-500 hover:from-red-600 hover:via-pink-600 hover:to-orange-600 text-white",
  success: "bg-gradient-to-r from-green-400 via-teal-400 to-blue-400 hover:from-green-500 hover:via-teal-500 hover:to-blue-500 text-white",
  purple: "bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 hover:from-purple-600 hover:via-pink-600 hover:to-indigo-600 text-white",
};

const sizeClasses = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2",
  lg: "px-6 py-3 text-lg",
};

const Button = ({ children, type = "button", variant = "primary", size = "md", className = "", ...props }) => {
  return (
    <button
      type={type}
      className={`rounded-xl transition-all duration-200 font-semibold focus:outline-none cursor-pointer shadow-lg shadow-purple-100/40 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;