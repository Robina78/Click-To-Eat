import React from "react";
import { render } from "@testing-library/react";
import ProfileForm from "./ProfileForm";


it("matches snapshot", function () {
  const { asFragment } = render(<ProfileForm/>);
  expect(asFragment()).toMatchSnapshot();
});