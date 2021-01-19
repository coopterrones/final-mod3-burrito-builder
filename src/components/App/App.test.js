import React from "react";
import { screen, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import OrderForm from "../OrderForm/OrderForm";
import userEvent from "@testing-library/user-event";
import Orders from "../Orders/Orders";
import App from "../App/App";
import { apiCalls } from "../../apiCalls";

jest.mock("../../apiCalls");

describe("App", () => {
  it("Should get all data on load", async () => {
    apiCalls.getOrders.mockResolvedValue({
      orders: [
        { id: 1, name: "Pat", ingredients: ["beans", "lettuce", "carnitas"] },
        {
          id: 2,
          name: "Sam",
          ingredients: ["steak", "pico de gallo", "lettuce", "carnitas"],
        },
      ],
    });

    render(<App />);
    await waitFor(() => expect(apiCalls.getOrders).toHaveBeenCalledTimes(1));
  });

  it("Should render orders correctly", async () => {
    apiCalls.getOrders.mockResolvedValue({
      orders: [
        { id: 1, name: "Pat", ingredients: ["beans", "lettuce", "carnitas"] },
        {
          id: 2,
          name: "Sam",
          ingredients: ["steak", "pico de gallo", "lettuce", "carnitas"],
        },
      ],
    });

    render(<App />);

    await waitFor(() => expect(screen.getByText("Sam")));
  });

  it("Should be able to add an order", async () => {
    apiCalls.getOrders.mockResolvedValue({
      orders: [
        { id: 1, name: "Pat", ingredients: ["beans", "lettuce", "carnitas"] },
        {
          id: 2,
          name: "Sam",
          ingredients: ["steak", "pico de gallo", "lettuce", "carnitas"],
        },
      ],
    });

    apiCalls.addOrder.mockResolvedValue();

    render(<App />);

    const nameInput = screen.getByPlaceholderText("Name");
    const beansButton = screen.getByText("beans");
    const steakButton = screen.getByText("steak");
    const submitOrderButton = screen.getByText("Submit Order");

    userEvent.type(nameInput, "Cooper");
    userEvent.click(beansButton);
    userEvent.click(steakButton);
    userEvent.click(submitOrderButton);

    await waitFor(() => expect(screen.getByText("Cooper")));
  });

  it("Should filter order inputs to ensure that there is no post without name and ingredients", async () => {
    apiCalls.getOrders.mockResolvedValue({
      orders: [
        { id: 1, name: "Pat", ingredients: ["beans", "lettuce", "carnitas"] },
        {
          id: 2,
          name: "Sam",
          ingredients: ["steak", "pico de gallo", "lettuce", "carnitas"],
        },
      ],
    });

    render(<App />);

    const submitOrderButton = screen.getByText("Submit Order");
    const nameInput = screen.getByPlaceholderText("Name");

    userEvent.type(nameInput, "Cooper");
    userEvent.click(submitOrderButton);

    const name = screen.queryByText("Cooper");

    await waitFor(() => expect(name).toBeNull());
  });
});
