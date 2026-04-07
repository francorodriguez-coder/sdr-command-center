export default function GraphPage() {
  return (
    <iframe
      src="/graph.html"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        border: 'none',
        display: 'block',
      }}
      title="Aerolab Ecosystem Graph"
    />
  );
}
