import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
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
  Toolbar: ({ markdown, onExportPDF, onNewDocument }: { markdown: string; onExportPDF: () => void; onNewDocument: () => void }) => (
    <div>
      <span data-testid="toolbar-markdown">{markdown}</span>
      <button onClick={onExportPDF}>Exportar PDF</button>
      <button onClick={onNewDocument}>Novo</button>
    </div>
  ),
}));

vi.mock('../src/utils/pdf', () => ({
  exportToPDF: vi.fn(),
}));

describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
  });

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

  it('reseta o documento ao confirmar novo', () => {
    render(<App />);

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'conteúdo editado' } });
    fireEvent.click(screen.getByRole('button', { name: 'Novo' }));
    fireEvent.click(screen.getByRole('button', { name: 'Confirmar' }));

    expect(screen.getByTestId('toolbar-markdown')).toHaveTextContent('# Meu Documento');
  });

  it('não reseta o documento ao cancelar confirmação', () => {
    render(<App />);

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'conteúdo editado' } });
    fireEvent.click(screen.getByRole('button', { name: 'Novo' }));
    fireEvent.click(screen.getByRole('button', { name: 'Cancelar' }));

    expect(screen.getByTestId('toolbar-markdown')).toHaveTextContent('conteúdo editado');
  });

  it('usa conteúdo padrão quando localStorage lança exceção na leitura', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('bloqueado'); });
    render(<App />);
    expect(screen.getByTestId('toolbar-markdown')).toHaveTextContent('# Meu Documento');
    vi.restoreAllMocks();
  });

  it('não lança exceção quando localStorage lança erro ao salvar', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('bloqueado'); });
    expect(() => render(<App />)).not.toThrow();
    vi.restoreAllMocks();
  });
});
