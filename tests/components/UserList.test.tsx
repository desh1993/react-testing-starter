import { render, screen } from "@testing-library/react";
import UserList from "../../src/components/UserList";
import { User } from "../../src/entities";
describe("UserList", () => {
  it("should return no users available if user list is empty", () => {
    render(<UserList users={[]} />);
    const users = screen.getByText(new RegExp("No users available.", "i"));
    expect(users).toBeInTheDocument();
  });

  it("renders user names as links", () => {
    const users: User[] = [
      { id: 1, name: "Desh" },
      { id: 2, name: "Leyla" },
    ];
    render(<UserList users={users} />);
    users.forEach((user) => {
      const link = screen.getByRole("link", { name: user.name });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", `/users/${user.id}`);
    });
  });
});
