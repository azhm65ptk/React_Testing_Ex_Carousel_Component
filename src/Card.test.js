import React from "react";
import { render } from "@testing-library/react";
import Card from "./Card";

test("it render without crushing", function () {
  render(<Card />);
});

//snapshot
test("it matches snapshot test", function () {
  const { asFragment } = render(<Card />);
  expect(asFragment()).toMatchSnapshot();
});
