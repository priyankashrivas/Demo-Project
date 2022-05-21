import React, {useState} from 'react'
import { connect, useDispatch } from 'react-redux';
import { signupAction } from '../../store/actions/AuthAction';
import { toast } from "react-toastify";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const SignUp = (props) => {
   const history=useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  let errorsObj = { email: '', password: '' };
  const [errors, setErrors] = useState(errorsObj);
  const [password, setPassword] = useState('');

  function onSignUp(e) {
    e.preventDefault();
    let error = false;
    const errorObj = { ...errorsObj };
    if (email === '') {
        errorObj.email = 'Email is Required';
        error = true;
        // toast.warning('Incpmplete Email Field Entry');
    }

    if (password === '') {
        errorObj.password = 'Password is Required';
        error = true;
        // toast.warning('Incpmplete Password Field Entry');
    }

    setErrors(errorObj);

    if (error) return;
    dispatch(signupAction(email, password, props.history));
   history.push('/login')
}

  return (
    <div className='flex justify-center my-5'>
        
      <div className='w-1/3 shadow p-3 border border-black-400'>
        <h1>Sign Up</h1>
        {props.errorMessage && (
                    <div className='bg-red-300  border border-red-900 p-1 my-2' style={{color: 'red'}}>
                        {props.errorMessage}
                    </div>
                )}
                {props.successMessage && (
                    <div className='bg-green-300 text-green-900 border border-green-900 p-1 my-2'>
                        {props.successMessage}
                    </div>
                )}
                <form onSubmit={onSignUp}>
                  <div>
                   
                    <label>Email</label>
                    <div>
                    <input
                                type='text'
                                className='border border-gray-600 p-1 w-full'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                    </div>
                    {errors.email && <div className="text-danger">{errors.email}</div>}
                  </div>
                  <div>
                        <label>Password</label>
                        <div>
                            <input
                                type='password'
                                className='border border-gray-600 p-1 w-full'
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                            />
                        </div>
                        {errors.password && <div className="text-danger">{errors.password}</div>}
                    </div>
                    <div className='my-3'>
                        <button
                            type='submit'
                            className='btn btn-primary text-white px-3 py-1'
                        >
                            Sign Up
                        </button>
                    </div>
                </form>

      </div>
      
    </div>
    
  );
}

const mapStateToProps = (state) => {
  return {
      errorMessage: state.auth.errorMessage,
      successMessage: state.auth.successMessage,
      // showLoading: state.auth.showLoading,
  };
};

export default connect(mapStateToProps)(SignUp);
