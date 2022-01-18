import React from "react";
import { render } from "@testing-library/react";
import RestaurantList from "./RestaurantList";


it("matches snapshot", function () {
  const { asFragment } = render(<RestaurantList />);
  expect(asFragment()).toMatchSnapshot();
});