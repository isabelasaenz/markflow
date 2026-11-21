import { useEffect } from 'react';

interface ToastProps {
  message: string;
  type?: 'error' | 'success';
  onClose: () => void;
  duration?: number;
}

export function Toast({ message, type = 'error', onClose, duration = 4000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className={`toast toast-${type}`} role="alert" aria-live="assertive">
      <span className="toast-message">{message}</span>
      <button className="toast-close" onClick={onClose} aria-label="Fechar notificação">✕</button>
    </div>
  );
}
