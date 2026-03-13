function LoadingSpinner({ size = 36, color = "#6366f1" }) {
  return (
    <div style={{
      width: size, height: size,
      border: `3px solid #e2e8f0`,
      borderTopColor: color,
      borderRadius: "50%",
      animation: "spin .8s linear infinite",
    }} />
  );
}
export default LoadingSpinner