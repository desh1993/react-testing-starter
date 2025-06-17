import { render, screen } from "@testing-library/react";
import OrderStatusSelector from "../../src/components/OrderStatusSelector";
import { Theme } from "@radix-ui/themes";
import userEvent from "@testing-library/user-event";

describe("OrderStatusSelector", () => {
  const renderOrderStatusSelector = () => {
    const onChange = vi.fn();
    render(
      <Theme>
        <OrderStatusSelector onChange={onChange} />
      </Theme>
    );
    return {
      button: screen.getByRole("combobox"),
      user: userEvent.setup(),
      getOptions: () => {
        return screen.findAllByRole("option");
      },
      getOption: (label: RegExp) =>
        screen.findByRole("option", { name: label }),
      onChange,
    };
  };

  it(`Should render new as default value`, () => {
    const { button } = renderOrderStatusSelector();
    expect(button).toHaveTextContent(/new/i);
  });

  it("Should render correct options/statuses when button is clicked ", async () => {
    const { button, user, getOptions } = renderOrderStatusSelector();

    await user.click(button);
    const options = await getOptions();

    expect(options).toHaveLength(3);
    const labels = options.map((option) => {
      return option.textContent;
    });
    expect(labels).toEqual(["New", "Processed", "Fulfilled"]);
  });

  //Parametized test
  it.each([
    { label: "Processed", value: "processed" },
    { label: "Fulfilled", value: "fulfilled" },
  ])(
    "Should call onChange with $value when the $label is selected.",
    async ({ label, value }) => {
      const { button, user, onChange } = renderOrderStatusSelector();

      await user.click(button);

      const option = await screen.findByText(label);
      await user.click(option);

      expect(onChange).toBeCalledWith(value);
    }
  );

  it("Should call onchange with 'new' when 'New' is selected", async () => {
    const { button, user, onChange, getOption } = renderOrderStatusSelector();

    await user.click(button);
    //Select a different value
    const option = await getOption(/Processed/i);
    await user.click(option);

    await user.click(button); // 🔥 reopen dropdown again
    const newOption = await getOption(/New/i);
    await user.click(newOption);

    expect(onChange).toBeCalledWith("new");
  });
});
