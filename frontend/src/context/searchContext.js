import { createContext, useMemo, useReducer } from 'react';

const INITIAL_SEARCH_STATESTATE = {
  destination: undefined,
  dates: [],
  options: {
    adult: undefined,
    children: undefined,
    room: undefined,
  },
};

export const SearchContext = createContext(INITIAL_SEARCH_STATESTATE);

const SearchReducer = (state, action) => {
  switch (action.type) {
    case 'NEW_SEARCH':
      const newState = action.payload;
      localStorage.setItem('searchState', JSON.stringify(newState)); 
      return newState;
    case 'RESET_SEARCH':
      const initialState = INITIAL_SEARCH_STATESTATE;
      localStorage.setItem('searchState', JSON.stringify(initialState)); 
      return initialState;
    default:
      return state;
  }
};

export const SearchContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    SearchReducer,
    JSON.parse(localStorage.getItem('searchState')) || INITIAL_SEARCH_STATESTATE
  );

  const searchContextData = useMemo(
    () => ({
      destination: state.destination,
      dates: state.dates,
      options: state.options,
      dispatch,
    }),
    [state.destination, state.dates, state.options]
  );

  return (
    <SearchContext.Provider value={searchContextData}>
      {children}
    </SearchContext.Provider>
  );
};
