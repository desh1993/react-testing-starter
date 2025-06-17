import { render, screen } from "@testing-library/react";
import TermsAndConditions from "../../src/components/TermsAndConditions";
import userEvent from "@testing-library/user-event";

describe("TermsAndConditions", () => {
  const renderTermsAndConditions = () => {
    render(<TermsAndConditions />);
    return {
      heading: screen.getByRole("heading"),
      checkbox: screen.getByRole("checkbox"),
      button: screen.getByRole("button"),
      user: userEvent.setup(),
    };
  };

  it("Should render with correct text and initial state", () => {
    const { heading, checkbox, button } = renderTermsAndConditions();

    expect(heading).toBeInTheDocument();

    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();

    expect(button).toBeDisabled();
  });

  it(`Should enable the button when the checkbox is checked`, async () => {
    const { checkbox, user, button } = renderTermsAndConditions();
    await user.click(checkbox);

    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toBeChecked();

    expect(button).toBeEnabled();
  });
});
