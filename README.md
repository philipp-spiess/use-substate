# ⚓️ useSubstate

Lightweight ([<600B minified + gzipped](https://bundlephobia.com/result?p=use-substate)) React Hook to **sub**scribe to a **sub**set of your state.


```js
function Component() {
  const [substate, dispatch] = useSubstate(state => {
    return { count: state.count };
  });

  return (
    <div>
      {substate.count}

      <button
        onClick={() => dispatch({ type: "INCREMENT" })}
      >
        Increment
      </button>
    </div>
  );
}
```

## Requirements

__⚠️ To use `useSubstate`, you will need the unstable and experimental React 16.7.0-alpha.__

`useSubstate` can also be used together with [react-redux][] in your existing [Redux][] application. Check out [Comparison To Redux](#comparison-to-redux) for more information.

## Installation

```bash
npm install --save use-substate
```

## Features

- ⏬ Lightweight
- ✅ Concurrent React ready (avoids rendering stale state)
- 🐋 Only updates components that need to be updated
- 🔂 Uses an external event subscription to short-circuit context propagation
- 🎈 Full Flow and TypeScript support coming soon
- ⚛️ Works with your existing Redux-like store
- 🎮 You’re in full control of your store and can use it outside React as well

## Usage

You can use `useSubstate` with your existing [Redux][] store or with a simple alternative (like [create-state](https://github.com/philipp-spiess/create-state)). This package will export a [React Context](https://reactjs.org/docs/context.html) consumer (`SubstateContext`) as well the `useSubstate` hook.

This custom hook will expose an API similar to [`useReducer`](https://reactjs.org/docs/hooks-reference.html#usereducer). The only argument for `useSubstate` is a `selectSubstate` function which is used to select parts of your state to be used within the component that uses the hook. This allows `useSubstate` to bail out if unnecessary parts change. Every component that uses this custom hook will automatically subscribe to the store.

The example below will show all steps necessary to use `useSubstate`:

```js
import React, { useState } from "react";
import ReactDOM from "react-dom";

import createStore from "create-state";
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
    <div>
      {substate.count}

      <button onClick={() => dispatch({ type: "INCREMENT" })}>Increment</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>Decrement</button>
    </div>
  );
}

ReactDOM.render(
  <SubstateProvider value={store}>
    <App />
  </SubstateProvider>,
  rootElement
);
```

[![Edit useSubstate Example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/4w406kwy44)

## Comparison To Redux

[Redux][] itself is a library used to create stores that can be updated via reducers. In fact, `useSubstate` works flawlessly with your current Redux store.

In opposite to [react-redux][], this library only requires a `selectSubstate` function (similar to [react-redux][]'s `mapStateToProps`). It is meant to call the `dispatch` function with the action directly. Advanced concepts like `connectAdvanced` or `mapDispatchToProps` are deliberately not supported.

To use `useSubstate` with your current [react-redux][] React application, find the react-redux `Provider` and make sure to wrap it with a `SubstateProvider`:

```diff
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
+ import { SubstateProvider } from "use-substate";
import { createStore } from "redux";
import todoApp from "./reducers";
import App from "./components/App";

const store = createStore(todoApp);

render(
+ <SubstateProvider value={store}>
    <Provider store={store}>
      <App />
    </Provider>
+ </SubstateProvider>,
  document.getElementById("root")
);
```

## Acknowledgements

Special thanks to [@sophiebits](https://github.com/sophiebits) and [@gaearon](https://github.com/gaearon) for helping me spot an issue in my initial implementation and showing me how to fix it.

## Contributing

Every help on this project is greatly appreciated. To get you started, here's a quick guide on how to make good and clean pull-requests:

1.  Create a fork of this [repository](https://github.com/philipp-spiess/use-substate), so you can work on your own environment.
2.  Install development dependencies locally:

    ```bash
    git clone git@github.com:<your-github-name>/use-substate.git
    cd use-substate
    yarn install
    ```

3.  Make changes using your favorite editor.
4.  Commit your changes ([here](https://chris.beams.io/posts/git-commit/) is a wonderful guide on how to make amazing git commits).
5.  After a few seconds, a button to create a pull request should be visible inside the [Pull requests](https://github.com/philipp-spiess/use-substate/pulls) section.

## Future Improvements

- [ ] Add Flow and TypeScript types. This is actually very important for this library: Actions must be typed as an enum such that the type system can find out if we use the wrong type.
- [ ] Improve test harness.

## License

[MIT](https://github.com/philipp-spiess/use-substate/blob/master/README.md)

[Redux]: https://redux.js.org/introduction
[react-redux]: https://github.com/reduxjs/react-redux
