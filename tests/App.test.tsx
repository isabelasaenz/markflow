import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import App from '../src/App';
import { exportToPDF } from '../src/utils/pdf';

vi.mock('../src/components/Editor', () => ({
  Editor: ({ value, onChange }: { value: string; onChange: (value: string) => void }) => (
    <textarea
      aria-label="markdown editor"
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  ),
}));

vi.mock('../src/components/Toolbar', () => ({
  Toolbar: ({ markdown, onExportPDF }: { markdown: string; onExportPDF: () => void }) => (
    <div>
      <span data-testid="toolbar-markdown">{markdown}</span>
      <button onClick={onExportPDF}>Exportar PDF</button>
    </div>
  ),
}));

vi.mock('../src/utils/pdf', () => ({
  exportToPDF: vi.fn(),
}));

describe('App', () => {
  it('compartilha o estado do editor com a toolbar', () => {
    render(<App />);

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'novo conteúdo' } });

    expect(screen.getByTestId('toolbar-markdown')).toHaveTextContent('novo conteúdo');
  });

  it('exporta o conteúdo atual', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: 'Exportar PDF' }));

    expect(exportToPDF).toHaveBeenCalledWith('# Meu Documento\n\nComece a escrever...');
  });
});
