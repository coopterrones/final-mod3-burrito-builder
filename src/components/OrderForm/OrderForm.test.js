import React from "react";
import { screen, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import OrderForm from "../OrderForm/OrderForm";
import userEvent from "@testing-library/user-event";

describe("Order Form", () => {
  it("Should render order form component connection", () => {
    render(<OrderForm />);

    const nameInput = screen.getByPlaceholderText("Name");
    const beansButton = screen.getByText("beans");
    const steakButton = screen.getByText("steak");
    const carnitasButton = screen.getByText("carnitas");
    const sofritasButton = screen.getByText("sofritas");
    const lettuceButton = screen.getByText("lettuce");
    const hotSauceButton = screen.getByText("hot sauce");
    const guacamoleButton = screen.getByText("guacamole");
    const jalapenosButton = screen.getByText("jalapenos");
    const cilantroButton = screen.getByText("cilantro");
    const sourCreamButton = screen.getByText("sour cream");
    const orderDisplay = screen.getByText("Order: Nothing selected");

    expect(nameInput).toBeInTheDocument();
    expect(beansButton).toBeInTheDocument();
    expect(steakButton).toBeInTheDocument();
    expect(carnitasButton).toBeInTheDocument();
    expect(sofritasButton).toBeInTheDocument();
    expect(lettuceButton).toBeInTheDocument();
    expect(hotSauceButton).toBeInTheDocument();
    expect(guacamoleButton).toBeInTheDocument();
    expect(jalapenosButton).toBeInTheDocument();
    expect(cilantroButton).toBeInTheDocument();
    expect(sourCreamButton).toBeInTheDocument();
    expect(orderDisplay).toBeInTheDocument();
  });

  it("Should be able to add ingredients to order display", () => {
    render(<OrderForm />);

    const beansButton = screen.getByText("beans");
    const steakButton = screen.getByText("steak");

    userEvent.click(beansButton);
    userEvent.click(steakButton);

    const orderDisplay = screen.getByText("Order: beans, steak");

    expect(orderDisplay).toBeInTheDocument();
  });
});
