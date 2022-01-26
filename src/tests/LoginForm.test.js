import React from "react";
import { render } from "@testing-library/react";
import LoginForm from "../auth/LoginForm"; 
import { MemoryRouter } from "react-router";

it("matches snapshot", function () {
    const { asFragment } = render (
        <MemoryRouter>
            <LoginForm />
        </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
})