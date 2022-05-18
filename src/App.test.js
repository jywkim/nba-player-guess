import { render, screen } from '@testing-library/react';
import App from './App';

describe("<App />", () => {
  test('Renders NBA Wordle', () => {
    render(<App />);
    const linkElement = screen.getByText(/NBA Wordle/i);
    expect(linkElement).toBeInTheDocument();
  });
});
