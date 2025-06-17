import { render, screen } from "@testing-library/react";
import ToastDemo from "../../src/components/ToastDemo";
import toast, { Toaster } from "react-hot-toast";
import userEvent from "@testing-library/user-event";

// vi.mock("react-hot-toast", async () => {
//   const actual = await vi.importActual<typeof import("react-hot-toast")>(
//     "react-hot-toast"
//   );
//   return {
//     ...actual,
//     default: {
//       ...actual.default,
//       //   success: vi.fn(),
//     },
//   };
// });

describe("ToastDemo", () => {
  const renderToastDemo = () => {
    render(
      <>
        <ToastDemo />
        <Toaster />
      </>
    );
    const user = userEvent.setup();
    return {
      button: screen.getByRole("button"),
      user,
    };
  };

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("Should render a button", () => {
    const { button } = renderToastDemo();
    expect(button).toBeInTheDocument();
  });

  //   it(`Should show success message when button is clicked`, async () => {
  //     const successSpy = vi.spyOn(toast, "success");

  //     const { button, user } = renderToastDemo();
  //     await user.click(button);

  //     expect(successSpy).toHaveBeenCalledWith("Success");
  //   });

  it("Should render Toaster Component", async () => {
    const { button, user } = renderToastDemo();
    await user.click(button);
    const toast = await screen.findByText("Success");

    expect(toast).toBeInTheDocument();
  });
});
