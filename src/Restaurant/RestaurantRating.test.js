import React from "react";
import { render } from "@testing-library/react";
import RestaurantRating from "./RestaurantRating";



it("matches snapshot", function () {
  const { asFragment } = render(<RestaurantRating />);
  expect(asFragment()).toMatchSnapshot();
});