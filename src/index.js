import React, { useState, useContext, useEffect, useRef } from "react";
import shallowEqual from "./shallowEqual";

const StoreContext = React.createContext();

export const StoreProvider = StoreContext.Provider;

export function useStore(mapState) {
  const store = useContext(StoreContext);

  const [mappedState, setMappedState] = useState(() => {
    const state = store.getState();
    return mapState(state);
  });
  const prevMappedStateRef = usePreviousRef(mappedState);

  useEffect(
    () => {
      const checkForUpdates = () => {
        const nextState = store.getState();
        const nextMappedState = mapState(nextState);

        if (shallowEqual(prevMappedStateRef.current, nextMappedState)) {
          return;
        }

        setMappedState(nextMappedState);
      };
      checkForUpdates();

      return store.subscribe(checkForUpdates);
    },
    [store, mapState]
  );

  return [mappedState, store.dispatch];
}

function usePreviousRef(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref;
}
