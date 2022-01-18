import React from "react";
import { render } from "@testing-library/react";
import RestaurantCard from "./RestaurantCard";


it("matches snapshot", function () {
  const { asFragment } = render(<RestaurantCard />);
  expect(asFragment()).toMatchSnapshot();
});