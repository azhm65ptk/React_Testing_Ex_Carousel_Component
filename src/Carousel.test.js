import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

test("it render without crushing", function () {
  render(<Carousel />);
});

//snapshot
test("it matches snapshot test", function () {
  const { asFragment } = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
});

it("works when you click on the right arrow", function () {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(
    queryByAltText("Photo by Richard Pasquarella on Unsplash")
  ).toBeInTheDocument();
  expect(
    queryByAltText("Photo by Pratik Patel on Unsplash")
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    queryByAltText("Photo by Richard Pasquarella on Unsplash")
  ).not.toBeInTheDocument();
  expect(
    queryByAltText("Photo by Pratik Patel on Unsplash")
  ).toBeInTheDocument();
});

// Part 3
it("works when you click left arrow", function () {
  const { getByTestId, queryByAltText } = render(<Carousel />);

  const leftArrow = getByTestId("left-arrow");
  const rightArrow = getByTestId("right-arrow");

  //move to the right
  fireEvent.click(rightArrow);

  //move back to the left, expect the first image to show
  fireEvent.click(leftArrow);

  expect(
    queryByAltText("Photo by Richard Pasquarella on Unsplash")
  ).toBeInTheDocument();
  expect(
    queryByAltText("Photo by Pratik Patel on Unsplash")
  ).not.toBeInTheDocument();
});

//Part-4

test("hide and show properly", function () {
  const { getByTestId } = render(<Carousel />);
  const leftArrow = getByTestId("left-arrow");
  const rightArrow = getByTestId("right-arrow");

  //expect the left arrow unable, but can click the right arrow
  expect(leftArrow).toHaveClass("hidden");
  expect(rightArrow).not.toHaveClass("Hidden");

  // move forward and now able to click on both left and right
  fireEvent.click(getByTestId("right-arrow"));
  expect(leftArrow).not.toHaveClass("hidden");
  expect(rightArrow).not.toHaveClass("Hidden");

  //move forward again and now the end and no more right arrow to click
  fireEvent.click(getByTestId("right-arrow"));
  expect(leftArrow).not.toHaveClass("hidden");
  expect(rightArrow).toHaveClass("hidden");
});
