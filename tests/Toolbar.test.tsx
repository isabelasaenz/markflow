import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Toolbar } from '../src/components/Toolbar';

describe('Toolbar', () => {
  it('renderiza contagem de palavras', () => {
    render(<Toolbar markdown="olá mundo" />);
    expect(screen.getByText(/Palavras: 2/)).toBeInTheDocument();
  });
  it('renderiza contagem de caracteres', () => {
    render(<Toolbar markdown="abc" />);
    expect(screen.getByText(/Caracteres: 3/)).toBeInTheDocument();
  });
  it('exibe 0 quando markdown está vazio', () => {
    render(<Toolbar markdown="" />);
    expect(screen.getByText(/Palavras: 0/)).toBeInTheDocument();
    expect(screen.getByText(/Caracteres: 0/)).toBeInTheDocument();
  });
});