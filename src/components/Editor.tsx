import MDEditor from '@uiw/react-md-editor';
import { sanitizeMarkdown } from '../utils/markdown';

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  theme?: 'light' | 'dark';
}

export function Editor({ value, onChange, theme = 'light' }: EditorProps) {
  const handleChange = (val?: string) => {
    onChange(sanitizeMarkdown(val || ''));
  };
  return (
    <div data-color-mode={theme}>
      <MDEditor value={value} onChange={handleChange} height={400} />
    </div>
  );
}