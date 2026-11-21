import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Toast } from '../src/components/Toast';

describe('Toast', () => {
  it('exibe a mensagem passada via prop', () => {
    render(<Toast message="Algo deu errado" onClose={() => {}} />);
    expect(screen.getByText('Algo deu errado')).toBeInTheDocument();
  });

  it('chama onClose ao clicar no botão fechar', () => {
    const onClose = vi.fn();
    render(<Toast message="Erro" onClose={onClose} />);
    fireEvent.click(screen.getByRole('button', { name: 'Fechar notificação' }));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('chama onClose automaticamente após o duration', async () => {
    vi.useFakeTimers();
    const onClose = vi.fn();
    render(<Toast message="Erro" onClose={onClose} duration={3000} />);
    await act(async () => { vi.advanceTimersByTime(3000); });
    expect(onClose).toHaveBeenCalledOnce();
    vi.useRealTimers();
  });

  it('tem role alert para acessibilidade', () => {
    render(<Toast message="Erro" onClose={() => {}} />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('aplica classe toast-error por padrão', () => {
    render(<Toast message="Erro" onClose={() => {}} />);
    expect(screen.getByRole('alert')).toHaveClass('toast-error');
  });

  it('aplica classe toast-success quando type é success', () => {
    render(<Toast message="Salvo!" onClose={() => {}} type="success" />);
    expect(screen.getByRole('alert')).toHaveClass('toast-success');
  });
});
