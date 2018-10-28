import React, { useState, useContext, useEffect, useRef } from "react";
import shallowEqual from "./shallowEqual";

const SubstateContext = React.createContext();

export const SubstateProvider = SubstateContext.Provider;

export function useSubstate(selectSubstate) {
  const store = useContext(SubstateContext);

  const [substate, setSubstate] = useState(() => {
    const state = store.getState();
    return selectSubstate(state);
  });

  const prevSubstateRef = useRef();
  useEffect(() => {
    prevSubstateRef.current = substate;
  });

  useEffect(
    () => {
      const checkForUpdates = () => {
        const nextState = store.getState();
        const nextSubstate = selectSubstate(nextState);

        if (shallowEqual(prevSubstateRef.current, nextSubstate)) {
          return;
        }

        setSubstate(nextSubstate);
      };
      checkForUpdates();

      return store.subscribe(checkForUpdates);
    },
    [store, selectSubstate]
  );

  return [substate, store.dispatch];
}
