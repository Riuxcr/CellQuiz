export default function Logo({ className = '', ...props }) {
  return (
    <img
      src="/logo.png"
      alt="CellStart"
      className={`object-contain ${className}`.trim()}
      {...props}
    />
  )
}
