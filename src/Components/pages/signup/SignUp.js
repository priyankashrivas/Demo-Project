import React, {useState} from 'react'
import { connect, useDispatch } from 'react-redux';
import { signupAction, loadingToggleAction } from '../../features/actions/AuthAction';
import Loader from '../../common/loader/Loader';
import { Button, Input, Label } from 'reactstrap';
import { Link } from 'react-router-dom';

const SignUp = (props) => {

  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  let errorsObj = { email: '', password: '' };
  const [errors, setErrors] = useState(errorsObj);
  const [password, setPassword] = useState('');

  function onSignUp(e) {
    e.preventDefault();
    let error = false;
    const errorObj = { ...errorsObj };
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (email === '') {
        errorObj.email = 'Email is Required';
        error = true;
    } else if (!regex.test(errorObj.email)){
      errorObj.email = "Invalid Email"
    }

    if (password === '') {
        errorObj.password = 'Password is Required';
        error = true;
    }

    setErrors(errorObj);

    if (error) return;
    dispatch(loadingToggleAction(true));
    dispatch(signupAction(email, password));
   
}

  return (
      <div className='flex justify-center my-5'>
        {props.showLoading && <Loader/>}
      <div className=' shadow p-3 ' style={{width: '31%', marginLeft: '30%', textAlign: 'center'}}>
        <h1 style={{textAlign: 'center', marginBottom: '7%'}}>Sign Up</h1>
        {props.errorMessage && (
                    <div className='bg-red-300  border border-red-900 p-1 my-2' style={{color: 'red'}}>
                        {props.errorMessage}
                    </div>
                )}
                {props.successMessage && (
                    <div className='bg-green-300  border border-green-900 p-1 my-2' style={{color: 'green'}}>
                        {props.successMessage}
                    </div>
                )}
                <form onSubmit={onSignUp}>
                  <div style={{textAlign:'center'}}>
                    <Label>Email</Label>
                    <div>
                    <Input
                                type='text'
                                className='border border-gray-600 p-1 w-full'
                                style={{width:'79%', marginLeft: '11%'}}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                    </div>
                    {errors.email && <div>{errors.email}</div>}
                  </div>
                  <div style={{textAlign:'center'}}>
                        <Label>Password</Label>
                        <div >
                            <Input
                                type='password'
                                className='border border-gray-600 p-1 w-full'
                                value={password}
                                style={{width:'79%', marginLeft: '11%'}}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                            />
                        </div>
                        {errors.password && <div>{errors.password}</div>}
                    </div>
                    <div className='my-3'>
                        <Button
                            type='submit'
                            className='btn btn-info text-white px-3 py-1'
                            style={{marginLeft: '2%'}}
                        >
                           Register
                        </Button>
                    </div>

                    <div>
                      <p className='me-4'> Already a Member? 
                       <Link to='/login'>     Sign In Into Your Account</Link>
                      </p>
                    </div>
                </form>

      </div>
      
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
      errorMessage: state.auth.errorMessage,
      successMessage : state.auth.successMessage,
       showLoading : state.auth.showLoading,
      
  };
};

export default connect(mapStateToProps)(SignUp);
