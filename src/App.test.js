import { render, screen } from '@testing-library/react';
import App from './App';

describe("<App />", () => {
  test('Render NBA Wordle title', () => {
    render(<App />);
    const elTitle = screen.getByText(/NBA Wordle/i);
    expect(elTitle).toBeInTheDocument();
  });

  test('Render player input element', () => {
    render(<App />);
    const elInput = screen.getByTestId("player-input");
    expect(elInput).toBeInTheDocument();
    expect(elInput).toHaveAttribute("type", "text");
  });

  test('Render default placeholder text', () => {
    render(<App />);
    const elInput = screen.queryByPlaceholderText(/Guess 1 of 8/i)
    expect(elInput).toBeInTheDocument();
  });
});