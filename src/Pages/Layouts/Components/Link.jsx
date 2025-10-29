const Link = ({ href = "#", children, className = "", ...props }) => (
  <a href={href} className={`text-blue-500 hover:underline transition ${className}`} {...props}>
    {children}
  </a>
);

export default Link;