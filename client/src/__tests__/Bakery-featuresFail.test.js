import React from "react";
import "@testing-library/jest-dom/extend-expect";
import {
  render,
  cleanup,
  waitForElement,
  waitFor,
  fireEvent,
  act
} from "@testing-library/react";

import Bakery from "../Bakery.js";
import axios from "axios";

//+ failure message on post request fail

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

  expect(getByTestId("window1")).toHaveClass("window window1");

  fireEvent.mouseEnter(getByTestId("window1"));

  expect(getByTestId("window1")).toHaveClass("window window1");
});
