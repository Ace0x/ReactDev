import { screen, render } from "@testing-library/react";
import App from "./App";

it("renders a basic login and register page", () => {
  const app = render(<App />);
});
