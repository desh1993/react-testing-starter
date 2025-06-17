import { render, screen } from "@testing-library/react";
import TagList from "../../src/components/TagList";

describe("TagList", () => {
  const renderTagList = async () => {
    render(<TagList />);
  };

  it(`Should render tags`, async () => {
    await renderTagList();
    const listItems = await screen.findAllByRole("listitem");
    expect(listItems).toHaveLength(3);
  });
});
