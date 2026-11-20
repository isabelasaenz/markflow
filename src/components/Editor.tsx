interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function Editor({ value, onChange }: EditorProps) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Escreva seu Markdown aqui..."
      rows={12}
      style={{ width: '100%', fontFamily: 'monospace', padding: 8 }}
    />
  );
}