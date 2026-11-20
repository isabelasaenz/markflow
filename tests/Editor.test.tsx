import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Editor } from '../src/components/Editor';

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
});