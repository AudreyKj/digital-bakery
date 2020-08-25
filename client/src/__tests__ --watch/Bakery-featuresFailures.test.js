import React from "react";
import "@testing-library/jest-dom/extend-expect";
import {
  render,
  cleanup,
  screen,
  waitForElement,
  waitFor,
  fireEvent,
  act
} from "@testing-library/react";
import Bakery from "../Bakery.js";
import axios from "axios";

afterEach(cleanup);

it("if nighMode is on, do not triggers POST request when user clicks on the door", async () => {
  axios.post.mockResolvedValueOnce([{}]);

  const { container, getByTestId, queryByText } = render(
    <Bakery sunToggle={false} />
  );

  fireEvent.click(getByTestId("door"));

  expect(queryByText("SUCCESS")).toBeFalsy();

  expect(axios.post).not.toHaveBeenCalled();
});

it("if nightMode is on, the windows do not transform to cookies on hover", () => {
  const { container, getByTestId } = render(<Bakery sunToggle={false} />);

  expect(getByTestId("window1")).toHaveClass("w-element window window1");
  expect(getByTestId("window2")).toHaveClass("w-element window window2");

  fireEvent.mouseEnter(getByTestId("window1"));
  fireEvent.mouseEnter(getByTestId("window2"));

  expect(getByTestId("window1")).toHaveClass("w-element window window1");
  expect(getByTestId("window2")).toHaveClass("w-element window window2");
});

it("displays error message if POST request fails", async () => {
  const errorMessage = "Network Error";

  axios.post.mockImplementationOnce(() =>
    Promise.reject(new Error(errorMessage))
  );

  const { container, getByTestId, getByRole, queryByText } = render(
    <Bakery sunToggle={true} />
  );

  fireEvent.click(getByTestId("door"));
  await waitForElement(() => screen.getByRole("alert"));

  expect(screen.getByRole("alert")).toHaveTextContent("ERROR");
  expect(queryByText("SUCCESS")).not.toBeInTheDocument();
  expect(axios.post).toHaveBeenCalledTimes(1);
});
