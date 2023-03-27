import axios from 'axios';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import './login.scss';

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleInput = (event) => {
    setCredentials((prev) => ({
      ...prev,
      [event.target.id]: event.target.value,
    }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    dispatch({ type: 'LOGIN_START' });
    try {
      const res = await axios.post('/authentication/login', credentials);
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
      if (window.history.state && window.history.state.idx > 0) {
        navigate(-1);
    } else {
        navigate('/', { replace: true }); // the current entry in the history stack will be replaced with the new one with { replace: true }
    }
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: error.response.data });
    }
  };

  return (
    <div className='login'>
      <div className='loginContainer'>
        <input
          type='text'
          className='loginInput'
          id='username'
          placeholder='username'
          onChange={handleInput}
        />
        <input
          type='password'
          className='loginInput'
          id='password'
          placeholder='password'
          onChange={handleInput}
        />
        <button
          disabled={loading}
          onClick={handleLogin}
          className='loginButton'>
          Login
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default Login;
