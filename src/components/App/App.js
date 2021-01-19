import React, { Component } from "react";
import "./App.css";
import Orders from "../../components/Orders/Orders";
import OrderForm from "../../components/OrderForm/OrderForm";
import { apiCalls } from "../../apiCalls";

class App extends Component {
  constructor() {
    super();
    this.state = {
      orders: [],
    };
  }

  componentDidMount() {
    this.getAllOrders();
  }

  getAllOrders() {
    let updateOrders;
    apiCalls
      .getOrders()
      .then((data) => {
        console.log(data);
        updateOrders = data.orders.map((order) => {
          return order;
        });
        this.setState({
          orders: updateOrders,
        });
      })
      .catch((err) => console.error("Error fetching:", err));
  }

  submitOrder = (orderName, orderIngredients) => {
    apiCalls.addOrder(orderName, orderIngredients).then(() => {
      this.setState({
        orders: [
          ...this.state.orders,
          { name: orderName, ingredients: orderIngredients },
        ],
      });
    });
  };

  filterOrder = (name, ingredients) => {
    console.log(name, ingredients);
    if (name.length && ingredients.length) {
      this.submitOrder(name, ingredients);
    } else if (name.length && !ingredients.legnth) {
      alert("Please add ingredients to your order.");
    } else if (ingredients.length && !name.legnth) {
      alert("Please add a name to your order.");
    }
  };

  render() {
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm
            submitOrder={this.submitOrder}
            filterOrder={this.filterOrder}
            updateOrders={this.updateOrders}
          />
        </header>

        <Orders orders={this.state.orders} />
      </main>
    );
  }
}

export default App;
