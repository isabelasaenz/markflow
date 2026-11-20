interface PreviewProps {
  markdown: string;
}

export function Preview({ markdown }: PreviewProps) {
  return (
    <div className="preview" style={{ background: '#fff', padding: 16, marginTop: 12 }}>
      <pre style={{ whiteSpace: 'pre-wrap' }}>{markdown}</pre>
    </div>
  );
}