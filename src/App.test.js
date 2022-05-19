import { render, screen } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event'

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
    const elInput = screen.queryByPlaceholderText(/Guess 1 of 8/i);
    expect(elInput).toBeInTheDocument();
  });

  test('Write text inside input to test entry', async () => {
    render(<App />);
    const elInput = screen.getByTestId("player-input");
    await userEvent.type(elInput, 'a');
    expect(elInput).toHaveValue('a');
  });

  test("Click stats button to test popup", async () => {
    render(<App />);
    const elButton = screen.getByTestId("stats-button");
    await userEvent.click(elButton);
    const stats = screen.getByTestId("stats-text");
    expect(stats.textContent).toEqual("GAMESPLAYED");
  });

  test("Click rules button to test popup", async () => {
    render(<App />);
    const elButton = screen.getByTestId("rules-button");
    await userEvent.click(elButton);
    const rules = screen.getByTestId("instructions-text");
    expect(rules.textContent).toEqual("Guess the NBA player in 8 tries!");
  }); 

  test("Click hint button to test popup", async () => {
    render(<App />);
    const elButton = screen.getByTestId("hint-button");
    await userEvent.click(elButton);
    const silhouette = screen.getByTestId("silhouette-text");
    expect(silhouette.textContent).toEqual("THIS PLAYER?");
  }); 
});