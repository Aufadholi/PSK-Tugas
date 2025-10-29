

const Card = ({ children, className = "" }) => (
  <div className={`w-full bg-white rounded-lg p-8 border border-gray-200 ${className}`}>
    {children}
  </div>
);

export default Card;