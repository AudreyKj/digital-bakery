import React from "react";
import "@testing-library/jest-dom/extend-expect";
import {
  render,
  cleanup,
  waitForElement,
  waitFor,
  fireEvent,
  act,
  screen
} from "@testing-library/react";

import Bakery from "../Bakery.js";
import axios from "axios";

afterEach(cleanup);

it("if nighMode is off, the windows transform to a cookie on hover", () => {
  const { container, getByTestId } = render(<Bakery sunToggle={true} />);

  expect(getByTestId("window1")).toHaveClass("window window1");
  expect(getByTestId("window2")).toHaveClass("window window2");

  //mouseEnter: window to cookie
  fireEvent.mouseEnter(getByTestId("window1"));
  expect(getByTestId("window1")).toHaveClass("cookie");
  fireEvent.mouseEnter(getByTestId("window2"));
  expect(getByTestId("window2")).toHaveClass("cookie cookie2");

  //mouseLeave: cookie to window
  fireEvent.mouseLeave(getByTestId("window1"));
  expect(getByTestId("window1")).toHaveClass("window window1");
  fireEvent.mouseLeave(getByTestId("window2"));
  expect(getByTestId("window2")).toHaveClass("window window2");
});

it("if nighMode is off, triggers POST request when user clicks on the door", async () => {
  axios.post.mockResolvedValueOnce({
    data: [{ id: 2, created_at: 1234678890 }]
  });

  const { container, getByTestId, getByRole } = render(
    <Bakery sunToggle={true} />
  );

  fireEvent.click(getByTestId("door"));

  await waitForElement(() => screen.getByRole("alert"));

  expect(screen.getByRole("alert")).toHaveTextContent("SUCCESS");

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

it("mailbox falls to the ground on click", () => {
  const { container, getByTestId } = render(<Bakery />);

  expect(getByTestId("mailbox")).toHaveClass(
    "mailbox d-flex flex-column align-items-center"
  );

  fireEvent.click(getByTestId("mailbox"));

  expect(getByTestId("mailbox")).toHaveClass(
    "mailboxFall d-flex flex-column align-items-center"
  );
});
