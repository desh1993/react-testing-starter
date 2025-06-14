import UserAccount from "../../src/components/UserAccount";

import { render, screen } from "@testing-library/react";
import { User } from "../../src/entities";

const user: User = {
  id: 1,
  name: "Desh",
};

describe("UserAccount", () => {
  it(`Should return Edit button if user is admin`, () => {
    user.isAdmin = true;
    render(<UserAccount user={user} />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/Edit/i);
  });
  it(`Should not return edit button if user is NOT admin`, () => {
    user.isAdmin = false;
    render(<UserAccount user={user} />);
    const button = screen.queryByRole("button");
    expect(button).not.toBeInTheDocument();
  });
  it(`Should return username if user object is passed`, () => {
    render(<UserAccount user={user} />);
    const username = screen.getByText(new RegExp(user.name, "i"));
    expect(username).toBeInTheDocument();
  });
});
