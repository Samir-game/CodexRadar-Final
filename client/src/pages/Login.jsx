import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../config/api";
import "../styles/Login.css";

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(api.login, data, {
        withCredentials: true,
      });

      if (response.status !== 200) {
        toast.error(response?.data?.message || "Invalid login credentials.");
        return;
      }

      toast.success("Login successful!");
      navigate("/home");
      reset();
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Welcome Back!</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <div className="login-form-group">
          <label htmlFor="userEmail" className="login-form-label">Email:</label>
          <input
            id="userEmail"
            type="email"
            {...register("userEmail", { required: "Email is required" })}
            className="login-form-input"
          />
          {errors.userEmail && <p className="login-error-text">{errors.userEmail.message}</p>}
        </div>

        <div className="login-form-group">
          <label htmlFor="password" className="login-form-label">Password:</label>
          <input
            id="password"
            type="password"
            {...register("userPassword", { required: "Password is required" })}
            className="login-form-input"
          />
          {errors.userPassword && <p className="login-error-text">{errors.userPassword.message}</p>}
        </div>

        <button type="submit" disabled={isSubmitting} className="login-submit-button">
          {isSubmitting ? "Logging in..." : "Login"}
        </button>

        <p className="login-signup-link">
          Don't have an account?{" "}
          <Link to="/signup" className="login-signup-link-anchor">Sign Up</Link>
        </p>
      </form>

      <ToastContainer />
    </div>
  );
};

export default Login;
