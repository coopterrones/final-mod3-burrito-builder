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
  // beforeEach(() => {
  //   apiCalls.getOrders.mockResolvedValue([
  //     { id: 1, name: "Pat", ingredients: ["beans", "lettuce", "carnitas"] },
  //     {
  //       id: 2,
  //       name: "Sam",
  //       ingredients: ["steak", "pico de gallo", "lettuce", "carnitas"],
  //     },
  //   ]);
  // });
  it("Should get all data on load", async () => {
    apiCalls.getOrders.mockResolvedValue([
      { id: 1, name: "Pat", ingredients: ["beans", "lettuce", "carnitas"] },
      {
        id: 2,
        name: "Sam",
        ingredients: ["steak", "pico de gallo", "lettuce", "carnitas"],
      },
    ]);

    render(<App />);
    await waitFor(() => expect(apiCalls.getOrders).toHaveBeenCalledTimes(1));
  });
});
