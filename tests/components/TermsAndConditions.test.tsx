import { render, screen } from "@testing-library/react";
import TermsAndConditions from "../../src/components/TermsAndConditions";
import userEvent from "@testing-library/user-event";

describe("TermsAndConditions", () => {
  it("Should render with correct text and initial state", () => {
    render(<TermsAndConditions />);

    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  it(`Should enable the button when the checkbox is checked`, async () => {
    const user = userEvent.setup();
    render(<TermsAndConditions />);

    const checkbox = screen.getByRole("checkbox");
    await user.click(checkbox);

    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toBeChecked();

    const button = screen.getByRole("button");
    expect(button).toBeEnabled();
  });
});
