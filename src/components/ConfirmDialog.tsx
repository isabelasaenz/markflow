interface ConfirmDialogProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({ message, onConfirm, onCancel }: ConfirmDialogProps) {
  return (
    <div className="confirm-overlay" role="dialog" aria-modal="true" aria-label="Confirmação">
      <div className="confirm-box">
        <p className="confirm-message">{message}</p>
        <div className="confirm-actions">
          <button onClick={onCancel} className="btn-cancel">Cancelar</button>
          <button onClick={onConfirm} className="btn-confirm">Confirmar</button>
        </div>
      </div>
    </div>
  );
}
