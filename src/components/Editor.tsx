import { useState } from 'react';

export function Editor() {
  const [value, setValue] = useState('');
  return (
    <textarea
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Escreva aqui..."
      rows={12}
      style={{ width: '100%', fontFamily: 'monospace', padding: 8 }}
    />
  );
}