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

it("POST request when user clicks on the door fails when nighMode is on", async () => {
  axios.post.mockResolvedValueOnce([{}]);

  const { container, getByTestId, queryByText } = render(
    <Bakery sunToggle={false} />
  );

  fireEvent.click(getByTestId("door"));

  expect(queryByText("SUCCESS")).toBeFalsy();

  expect(axios.post).not.toHaveBeenCalled();
});
