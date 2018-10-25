# ⚓️ useStore

Lightweight (<1kB gzipped) alternative for [react-redux][] using React Hooks.


```js
function Example() {
  const [mappedState, dispatch] = useStore(state => {
    return { count: state.count };
  });

  return (
    <div>
      {mappedState.count}

      <button onClick={() => dispatch({ type: "INCREMENT" })}>Increment</button>
    </div>
  );
}
```

In opposite to [react-redux][], this library only requires a `mapState` function. It is meant to call the `dispatch` function with the action directly. Advanced concepts like

## Requirements

__⚠️ To use `useStore`, you will need the unstable and experimental React 16.7.0-alpha.__

`useStore` can also be used together with [react-redux][] in your existing [Redux][] application.

## Installation

```bash
npm install --save use-store
```

## Usage

You can use `useStore` with your existing [Redux][] store or with a simple alternative (as outlined in [createStore.js](./example/createStore.js)). This package will export
a [React Context](https://reactjs.org/docs/context.html) consumer (`StoreContext`) as well the `useStore` hook.

This custom hook will expose an API similar to [`useReducer`](https://reactjs.org/docs/hooks-reference.html#usereducer). The only argument for `useStore` is a `mapState` function which is used to select parts of your store to be used within the component that uses the hook. This allows `useStore` to bail out if unnecessary parts change. Every component that uses this custom hook will automatically subscribe to the store.

The example below will show all steps necessary to use `useStore`:

```js
import React, { useState } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

import { createStore } from "./createStore";
import { StoreProvider, useStore } from "../";

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
  const [mappedState, dispatch] = useStore(state => {
    return { count: state.count };
  });

  return (
    <div>
      {mappedState.count}

      <button onClick={() => dispatch({ type: "INCREMENT" })}>Increment</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>Decrement</button>
    </div>
  );
}

ReactDOM.render(
  <StoreProvider value={store}>
    <App />
  </StoreProvider>,
  rootElement
);
```

[![Edit useStore Example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/4w406kwy44)

## Acknowledgements

Special thanks to @gaearon and @sophiebits for helping me spot an issue in my initial implementation and showing me how to fix it.

## Contributing

Every help on this project is greatly appreciated. To get you started, here's a quick guide on how to make good and clean pull-requests:

1.  Create a fork of this [repository](https://github.com/philipp-spiess/use-store), so you can work on your own environment.
2.  Install development dependencies locally:

    ```bash
    git clone git@github.com:<your-github-name>/use-store.git
    cd use-store
    yarn install
    ```

3.  Make changes using your favorite editor.
4.  Commit your changes ([here](https://chris.beams.io/posts/git-commit/) is a wonderful guide on how to make amazing git commits).
5.  After a few seconds, a button to create a pull request should be visible inside the [Pull requests](https://github.com/philipp-spiess/use-store/pulls) section.

## License

[MIT](https://github.com/philipp-spiess/use-store/blob/master/README.md)

[Redux]: https://redux.js.org/introduction
[react-redux]: https://github.com/reduxjs/react-redux
