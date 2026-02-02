import { render, screen } from "@testing-library/react";
import Contact from "../Contact";

test("Should load contact component", () => {
  render(<Contact />);

  const contactElement = screen.getByText("Contact Us");
  expect(contactElement).toBeInTheDocument();

  const heading = screen.getByRole("heading", { name: /contact us/i });
  expect(heading).toBeInTheDocument();
});

test("Should load 2 input boxes on the contact component", () => {
  render(<Contact />);

  const inputBoxes = screen.getAllByRole("textbox").filter(el => el.tagName === 'INPUT');
  expect(inputBoxes.length).toBe(2);
});
