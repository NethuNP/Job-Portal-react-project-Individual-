import React, { createContext, useEffect, useReducer } from "react";

const initial_state = {
  user: (() => {
    const storedUser = localStorage.getItem("seeker");
    if (storedUser && storedUser !== "undefined") {
      return JSON.parse(storedUser);
    }
    return null;
  })(),
  loading: false,
  error: null,
};

export const AuthContext = createContext(initial_state);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        seeker: action.payload,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        seeker: null,
        loading: false,
        error: action.payload,
      };
    case "REGISTER_SUCCESS":
      return {
        seeker: null,
        loading: false,
        error: null,
      };
    case "LOGOUT":
      return {
        seeker: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initial_state);

  useEffect(() => {
    localStorage.setItem("seeker", JSON.stringify(state.seeker));
  }, [state.seeker]);

  return (
    <AuthContext.Provider
      value={{
        seeker: state.seeker,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
