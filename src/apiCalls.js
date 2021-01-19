const getData = (path) => {
  return fetch(path).then((response) => {
    if (response.ok) {
      console.log(response);
      return response.json();
    } else {
      throw new Error(
        "We apologize. We are having issues loading this page... Please try again later!"
      );
    }
  });
};

const updateData = (path, action, orderName, orderIngredients) => {
  return fetch(path, {
    method: action,
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      name: orderName,
      ingredients: orderIngredients,
    }),
  }).then((response) => {
    if (response.ok) {
      return response;
    } else {
      throw new Error(
        "We apologize. We are having issues loading this page... Please try again later!"
      );
    }
  });
};

export const apiCalls = {
  getOrders: () => {
    return getData("http://localhost:3001/api/v1/orders");
  },
  addOrder: (orderName, orderIngredients) => {
    return updateData(
      "http://localhost:3001/api/v1/orders",
      "POST",
      orderName,
      orderIngredients
    );
  },
};
