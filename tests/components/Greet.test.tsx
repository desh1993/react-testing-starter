import Greet from "../../src/components/Greet";
import { render, screen } from "@testing-library/react";

describe("Greet", () => {
  it(`should render Hello with the name when the name is provided`, () => {
    render(<Greet name="Desh" />);
    const heading = screen.getByRole("heading");

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/hello desh/i);
  });

  it(`should render Login when the name is NOT provided`, () => {
    render(<Greet />);
    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/Login/i);
  });
});
