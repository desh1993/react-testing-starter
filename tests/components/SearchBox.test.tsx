import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBox from "../../src/components/SearchBox";

describe("SearchBox", () => {
  const renderSearchBox = () => {
    const onChange = vi.fn((text) =>
      console.log("onChange called with:", text)
    );
    render(<SearchBox onChange={onChange} />);
    const input = screen.getByPlaceholderText(/Search/i);
    const user = userEvent.setup();
    return { input, onChange, user };
  };

  it("Should Render an input field for searching", () => {
    const { input } = renderSearchBox();

    expect(input).toBeInTheDocument();
  });

  it("OnChange event should be called", async () => {
    const { input, onChange, user } = renderSearchBox();
    const searchTerm = "searchTerm";

    await user.type(input, `${searchTerm}{enter}`); //Simulate e.key === Enter event

    expect(onChange).toHaveBeenCalledWith(`${searchTerm}`);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("Onchange event should NOT be called when user input is empty", async () => {
    const { input, onChange, user } = renderSearchBox();
    const searchTerm = "";

    await user.type(input, `${searchTerm}{enter}`); //Simulate e.key === Enter event

    expect(onChange).toHaveBeenCalledTimes(0);
    expect(onChange).not.toHaveBeenCalledWith(`${searchTerm}`);
  });
});
