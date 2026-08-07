import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { api } from "../config/api";
import "../styles/SignUp.css";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(api.signup, data, {
        withCredentials: true,
      });

      if (response.status !== 201) {
        toast.error(response?.data?.message || 'Error registering user. Please try again.');
        return;
      }

      toast.success('Registration successful!');
      navigate('/home');
      reset();
    } catch (error) {
      console.error('Error during registration:', error.message);
      const errorMessage = error.response?.data?.message || 'Something went wrong. Please try again later.';
      toast.error(errorMessage);
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Create Your CodexRadar Account</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
        <div className="signup-form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            {...register('userName', { required: 'Name is required' })}
            className="signup-form-input"
          />
          {errors.userName && <p className="signup-error-text">{errors.userName.message}</p>}
        </div>

        <div className="signup-form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            {...register('userEmail', { required: 'Email is required' })}
            className="signup-form-input"
          />
          {errors.userEmail && <p className="signup-error-text">{errors.userEmail.message}</p>}
        </div>

        <div className="signup-form-group">
          <label htmlFor="codeforces">CodeForces Handle</label>
          <input
            id="codeforces"
            {...register('codeforcesHandle', { required: 'Codeforces Handle is required' })}
            className="signup-form-input"
          />
          {errors.codeforcesHandle && <p className="signup-error-text">{errors.codeforcesHandle.message}</p>}
        </div>

        <div className="signup-form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            {...register('userPassword', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
            className="signup-form-input"
          />
          {errors.userPassword && <p className="signup-error-text">{errors.userPassword.message}</p>}
        </div>

        <button type="submit" className="signup-submit-button" disabled={isSubmitting}>
          {isSubmitting ? 'Signing Up...' : 'Sign Up'}
        </button>

        <p className="signup-login-link">
          Already have an account?{' '}
          <Link to="/login" className="signup-login-link-anchor">
            Login
          </Link>
        </p>
      </form>

      <ToastContainer />
    </div>
  );
};

export default SignUp;
