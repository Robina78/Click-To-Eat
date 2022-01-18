import React from "react";
import { render } from "@testing-library/react";
import RestaurantItems from "./RestaurantItems";


it("matches snapshot", function () {
  const { asFragment } = render(<RestaurantItems />);
  expect(asFragment()).toMatchSnapshot();
});