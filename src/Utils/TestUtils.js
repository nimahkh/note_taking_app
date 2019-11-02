import React from "react";
import { StateProvider } from "../statemanagement";

export function clearLocaStorage() {
  localStorage.clear();
}

export function IncludingProvider(props) {
  const initialState = {
    notes: [],
    modal: false,
    edit: null,
    show: null,
    showModal: false
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "newNote":
        return {
          ...state,
          notes: action.notes
        };
      case "openModal":
        return {
          ...state,
          modal: action.modal,
          edit: action.edit
        };
      case "showMessage":
        return {
          ...state,
          showModal: action.showModal,
          show: action.show
        };

      default:
        return state;
    }
  };

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      {props.children}
    </StateProvider>
  );
}
