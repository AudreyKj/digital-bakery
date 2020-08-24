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

afterEach(cleanup);

it("POST request when user clicks on the door and nighMode is off", async () => {
  axios.post.mockResolvedValueOnce([{ id: 2, created_at: 1234678890 }]);

  const { container, getByTestId, getByText } = render(
    <Bakery sunToggle={true} />
  );

  fireEvent.click(getByTestId("door"));

  const launchesData = await waitForElement(() => getByTestId("success"));
  expect(getByTestId("success")).toHaveTextContent("SUCCESS");

  expect(axios.post).toHaveBeenCalledTimes(1);
});

it("nightMode toggle when user clicks on the sun", () => {
  const nightModeOn = jest.fn();

  const { container, getByTestId, getByText, rerender } = render(
    <Bakery nightMode={nightModeOn} sunToggle={true} />
  );

  //sun to moon
  fireEvent.click(getByTestId("sun"));
  rerender(<Bakery nightMode={nightModeOn} sunToggle={false} />);
  expect(nightModeOn).toHaveBeenCalledTimes(1);
  expect(getByTestId("sun")).toHaveClass("planet moon");

  //moon to sun
  fireEvent.click(getByTestId("sun"));
  rerender(<Bakery nightMode={nightModeOn} sunToggle={true} />);
  expect(nightModeOn).toHaveBeenCalledTimes(2);
  expect(getByTestId("sun")).toHaveClass("planet sun");
});
