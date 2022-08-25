import { expect, test } from "@jest/globals";
import { screen, render } from "@testing-library/react";
import App from "../App";

test("renders a basic login and register page", () => {
  render(<App />);
  expect(screen.getByText("Login")).toBeInTheDocument();
  expect(screen.getByText("Register")).toBeInTheDocument();
});
