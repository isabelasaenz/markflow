import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ConfirmDialog } from '../src/components/ConfirmDialog';

describe('ConfirmDialog', () => {
  it('exibe a mensagem passada via prop', () => {
    render(<ConfirmDialog message="Tem certeza?" onConfirm={() => {}} onCancel={() => {}} />);
    expect(screen.getByText('Tem certeza?')).toBeInTheDocument();
  });

  it('chama onConfirm ao clicar em Confirmar', () => {
    const onConfirm = vi.fn();
    render(<ConfirmDialog message="Tem certeza?" onConfirm={onConfirm} onCancel={() => {}} />);
    fireEvent.click(screen.getByRole('button', { name: 'Confirmar' }));
    expect(onConfirm).toHaveBeenCalledOnce();
  });

  it('chama onCancel ao clicar em Cancelar', () => {
    const onCancel = vi.fn();
    render(<ConfirmDialog message="Tem certeza?" onConfirm={() => {}} onCancel={onCancel} />);
    fireEvent.click(screen.getByRole('button', { name: 'Cancelar' }));
    expect(onCancel).toHaveBeenCalledOnce();
  });

  it('tem atributos de acessibilidade corretos', () => {
    render(<ConfirmDialog message="Tem certeza?" onConfirm={() => {}} onCancel={() => {}} />);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
  });
});
