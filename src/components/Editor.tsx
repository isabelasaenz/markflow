import MDEditor from '@uiw/react-md-editor';

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function Editor({ value, onChange }: EditorProps) {
  return (
    <div data-color-mode="light">
      <MDEditor value={value} onChange={(val) => onChange(val || '')} height={400} />
    </div>
  );
}