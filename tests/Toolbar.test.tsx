import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Toolbar } from '../src/components/Toolbar';

describe('Toolbar', () => {
  it('renderiza contagem de palavras', () => {
    render(<Toolbar markdown="olá mundo" onExportPDF={() => {}} />);
    expect(screen.getByText(/Palavras: 2/)).toBeInTheDocument();
  });
  it('renderiza contagem de caracteres', () => {
    render(<Toolbar markdown="abc" onExportPDF={() => {}} />);
    expect(screen.getByText(/Caracteres: 3/)).toBeInTheDocument();
  });
  it('exibe 0 quando markdown está vazio', () => {
    render(<Toolbar markdown="" onExportPDF={() => {}} />);
    expect(screen.getByText(/Palavras: 0/)).toBeInTheDocument();
    expect(screen.getByText(/Caracteres: 0/)).toBeInTheDocument();
  });
  it('exibe botão desabilitado e texto Exportando... quando exporting=true', () => {
    render(<Toolbar markdown="" onExportPDF={() => {}} exporting={true} />);
    const btn = screen.getByRole('button', { name: 'Exportando...' });
    expect(btn).toBeDisabled();
  });
  it('exibe ☀️ quando tema é escuro', () => {
    render(<Toolbar markdown="" onExportPDF={() => {}} theme="dark" />);
    expect(screen.getByRole('button', { name: 'Alternar tema' })).toHaveTextContent('☀️');
  });
  it('chama onExportPDF ao clicar em Exportar PDF', () => {
    const onExportPDF = vi.fn();
    render(<Toolbar markdown="" onExportPDF={onExportPDF} />);
    fireEvent.click(screen.getByRole('button', { name: 'Exportar PDF' }));
    expect(onExportPDF).toHaveBeenCalledOnce();
  });
  it('chama onToggleTheme ao clicar no botão de tema', () => {
    const onToggleTheme = vi.fn();
    render(<Toolbar markdown="" onExportPDF={() => {}} onToggleTheme={onToggleTheme} />);
    fireEvent.click(screen.getByRole('button', { name: 'Alternar tema' }));
    expect(onToggleTheme).toHaveBeenCalledOnce();
  });
});