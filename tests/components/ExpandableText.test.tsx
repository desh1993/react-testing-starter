import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ExpandableText from "../../src/components/ExpandableText";

describe("ExpandableText", () => {
  const defaultText =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore possimus sit voluptas fugit consectetur in similique harum ipsum neque vitae, quaerat, quo suscipit porro? Ea sit temporibus iusto, culpa explicabo error porro quam illum unde reiciendis asperiores aliquam quasi! Maxime iste iure at. Sed, a velit, nesciunt et ipsam ut iure qui non atque officiis nam magni illo corrupti animi amet optio? Ad voluptates laboriosam numquam quidem error, tempora perspiciatis dolores excepturi dolor repellendus accusamus totam nulla sed temporibus optio recusandae aliquam? Provident ex rem consequatur eius optio sunt laborum sed sapiente pariatur aspernatur. Officiis officia earum ex qui necessitatibus.";
  const limit = 255;
  //   const truncatedString = `${defaultText.substring(0, limit)}...`;
  const truncateString = (text: string) => {
    return text.substring(0, limit) + "...";
  };
  const renderComponent = (text: string = defaultText) => {
    render(<ExpandableText text={text} />);
    const truncatedString = truncateString(text);
    return {
      article: screen.queryByRole("article"),
      button: screen.getByRole("button"),
      getTruncatedString: screen.getByText(truncatedString),
      truncatedString: truncatedString,
    };
  };

  it("Should truncate text if text exceeds 255 characters", () => {
    const { article, button, getTruncatedString, truncatedString } =
      renderComponent();

    expect(article).toHaveTextContent(truncatedString); //confirms the behavior that the text is truncated
    expect(button).toHaveTextContent(/more/i);
    expect(getTruncatedString).toBeInTheDocument();
  });
  it("Should expand the text when user clicks on Show More button", async () => {
    const user = userEvent.setup();
    const { button } = renderComponent();

    await user.click(button);

    expect(button).toHaveTextContent(/less/i);
  });
  it("Should truncate the text when user clicks on Show Less button", async () => {
    const user = userEvent.setup();
    // render(<ExpandableText text={defaultText} />);
    const { button, truncatedString } = renderComponent();

    await user.click(button);

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/less/i);

    await user.click(button); //user clicks Show less btn now
    expect(screen.getByText(truncatedString)).toBeInTheDocument();
    expect(button).toHaveTextContent(/more/i);
  });
  it("Should render article if a short text is passed", () => {
    const text = "Short text";
    render(<ExpandableText text={text} />);

    const article = screen.getByRole("article");
    const button = screen.queryByRole("button");

    expect(button).not.toBeInTheDocument();
    expect(article).toBeInTheDocument();
    expect(article).toHaveTextContent(text);
  });
});
