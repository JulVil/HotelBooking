import axios from 'axios';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
      const res = await axios.post(
        'https://notbooking.onrender.com/authentication/login',
        credentials
      );
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
      if (window.history.state && window.history.state.idx > 0) {
        navigate(-1);
      } else {
        // the current entry in the history stack will be replaced with the new one with { replace: true }
        navigate('/', { replace: true });
      }
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: error.response.data });
      console.log(error.response.data);
    }
  };

  const handleRegister = () => {
    navigate('/register');
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') handleLogin(event);
  };

  return (
    <div className='login'>
      <div className='loginContainer'>
        <Link to={'/'} style={{ color: 'inherit', textDecoration: 'none' }}>
          <h1 className='logo'>NOTBOOKING</h1>
        </Link>
        <div className='loginCard'>
          <h2>
            Welcome! Please sign in <br />
            Or click the logo to go back
          </h2>
          <input
            type='text'
            className='loginInput'
            id='username'
            placeholder='username'
            onKeyDown={handleKeyDown}
            onChange={handleInput}
          />
          <input
            type='password'
            className='loginInput'
            id='password'
            placeholder='password'
            onKeyDown={handleKeyDown}
            onChange={handleInput}
          />
          <button
            disabled={loading}
            onClick={handleLogin}
            className='loginButton'>
            Login
          </button>
          <button
            disabled={loading}
            onClick={handleRegister}
            className='loginButton'>
            Register
          </button>
          {error && <span>{error.message}</span>}
        </div>
      </div>
    </div>
  );
};

export default Login;
