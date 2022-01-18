import React from "react";
import { render } from "@testing-library/react";
import Alert from "./Alert";
import { ExpandCircleDownTwoTone } from "@mui/icons-material";

it("render without craching", () => {
    render(<Alert />);
});

it("matches snapshot for danger", () => {
    let messages = ["Everything is broken", "Run for the hills"];
    const { asFragment } = render(<Alert type="danger" messages={messages} />);
    expect(asFragment()).toMatchSnapshot();
});

it("matches snapshot for success", () => {
    let messages = ["Everything is awesome!"];
    const { asFragment } = render(<Alert type="success" messages={messages} />);
    expect(asFragment()).toMatchSnapshot();
})
