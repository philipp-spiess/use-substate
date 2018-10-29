import React, { useState } from "react";
import ReactDOM from "react-dom";

import createStore from "create-store";
import { SubstateProvider, useSubstate } from "../";

const initialState = { count: 0 };
function reducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
  }
}
const store = createStore(reducer, initialState);

function App() {
  const [substate, dispatch] = useSubstate(state => {
    return { count: state.count };
  });

  return (
    <div className="App">
      <p>
        <strong>{substate.count}</strong>
      </p>

      <button onClick={() => dispatch({ type: "INCREMENT" })}>Increment</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>Decrement</button>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <SubstateProvider value={store}>
    <App />
  </SubstateProvider>,
  rootElement
);
