import MDEditor from '@uiw/react-md-editor';
import { sanitizeMarkdown } from '../utils/markdown';

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function Editor({ value, onChange }: EditorProps) {
  const handleChange = (val?: string) => {
    onChange(sanitizeMarkdown(val || ''));
  };
  return (
    <div data-color-mode="light">
      <MDEditor value={value} onChange={handleChange} height={400} />
    </div>
  );
}