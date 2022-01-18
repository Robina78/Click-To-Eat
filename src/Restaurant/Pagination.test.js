import React from "react";
import { render } from "@testing-library/react";
import { Pagination } from "element-react";



it("matches snapshot", function () {
  const { asFragment } = render(<Pagination />);
  expect(asFragment()).toMatchSnapshot();
});