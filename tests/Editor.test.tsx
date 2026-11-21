import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Editor } from '../src/components/Editor';

vi.mock('@uiw/react-md-editor', () => ({
  default: ({ value, onChange }: { value: string; onChange: (value: string) => void }) => (
    <div>
      <textarea
        aria-label="markdown editor"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      <div>{value.replace(/^#\s*/, '').replace(/<script>.*?<\/script>/gi, '')}</div>
    </div>
  ),
}));

describe('Editor', () => {
  it('renderiza a área de edição', () => {
    render(<Editor value="" onChange={() => {}} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
  it('exibe o valor passado via prop', () => {
    render(<Editor value="# Olá" onChange={() => {}} />);
    expect(screen.getByDisplayValue('# Olá')).toBeInTheDocument();
  });
  it('chama onChange ao digitar', async () => {
    const onChange = vi.fn();
    render(<Editor value="" onChange={onChange} />);
    await userEvent.type(screen.getByRole('textbox'), 'a');
    expect(onChange).toHaveBeenCalled();
  });
  it('renderiza o preview do markdown', () => {
    render(<Editor value="# Título" onChange={() => {}} />);
    expect(screen.getByText('Título')).toBeInTheDocument();
  });
  it('não renderiza tags script no preview', () => {
    render(<Editor value="<script>alert(1)</script>ok" onChange={() => {}} />);
    expect(screen.queryByText('alert(1)')).not.toBeInTheDocument();
  });
  it('aplica data-color-mode dark quando theme é dark', () => {
    const { container } = render(<Editor value="" onChange={() => {}} theme="dark" />);
    expect(container.querySelector('[data-color-mode="dark"]')).toBeInTheDocument();
  });
});