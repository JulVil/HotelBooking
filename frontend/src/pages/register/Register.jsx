import axios from 'axios';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import './register.scss';

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    email: undefined,
    password: undefined,
  });

  const navigate = useNavigate();

  const { loading, error, dispatch } = useContext(AuthContext);

  const handleInput = (event) => {
    setCredentials((prev) => ({
      ...prev,
      [event.target.id]: event.target.value,
    }));
  };
  
  const handleRegister = async (event) => {
    event.preventDefault();
    dispatch({ type: 'LOGIN_START' });
    try {
      const res = await axios.post('https://notbooking.onrender.com/api/authentication/register', credentials);
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
      if (window.history.state && window.history.state.idx > 0) {
        navigate(-1);
      } else {
        // the current entry in the history stack will be replaced with the new one with { replace: true }
        navigate('/', { replace: true });
      }
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: error.response.data });
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') handleRegister(event);
  };

  return (
    <div className='register'>
      <div className='registerContainer'>
        <h1 className='logo'>NOTBOOKING</h1>
        <div className='registerCard'>
          <h2>Create a free account</h2>
          <input
            type='text'
            className='registerInput'
            id='username'
            placeholder='username'
            onKeyDown={handleKeyDown}
            onChange={handleInput}
          />
          <input
            type='email'
            className='registerInput'
            id='email'
            placeholder='email'
            onKeyDown={handleKeyDown}
            onChange={handleInput}
          />
          <input
            type='password'
            className='registerInput'
            id='password'
            placeholder='password'
            onKeyDown={handleKeyDown}
            onChange={handleInput}
          />
          <button
            disabled={loading}
            onClick={handleRegister}
            className='registerButton'>
            Register
          </button>
          {error && <span>{error.message}</span>}
        </div>
      </div>
    </div>
  );
};

export default Register;
