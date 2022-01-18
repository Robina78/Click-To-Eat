import React from "react";
import { render } from "@testing-library/react";
import HeaderTabs from "./HeaderTabs";


it("matches snapshot", function () {
  const { asFragment } = render(<HeaderTabs />);
  expect(asFragment()).toMatchSnapshot();
});