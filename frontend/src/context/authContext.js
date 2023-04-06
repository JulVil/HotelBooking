import { createContext, useEffect, useMemo, useReducer } from 'react';

const INITIAL_USER_STATE = {
  user: null || JSON.parse(localStorage.getItem('user')),
  loading: false,
  error: null,
};

export const AuthContext = createContext(INITIAL_USER_STATE);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
    case 'LOGOUT':
      return {
        user: null, 
        loading: false,
        error: null,
      };
    case 'LOGIN_SUCCESS':
      return {
        user: action.payload,
        loading: false,
        error: null,
      };
    case 'LOGIN_FAILURE':
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_USER_STATE);

  useEffect(() => {
    if (state.user) {
      const { password, ...userWithoutPassword } = state.user;
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    } else {
      localStorage.removeItem('user');
    }
  }, [state.user]);

  const userContextData = useMemo(
    () => ({
      user: state.user,
      loading: state.loading,
      error: state.error,
      dispatch,
    }),
    [state.user, state.loading, state.error]
  );

  return (
    <AuthContext.Provider value={userContextData}>
      {children}
    </AuthContext.Provider>
  );
};
