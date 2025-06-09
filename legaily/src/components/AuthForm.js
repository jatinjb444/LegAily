import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

function AuthForm({ type, heading, subheading, buttonText, setIsLoggedIn }) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(`${type} form submitted`, data);

    // Simulate login/signup success by saving dummy token
    localStorage.setItem("token", "dummy-legaily-token");

    // Update login state
    setIsLoggedIn(true);

    // Redirect to home
    navigate("/");
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-2">{heading}</h2>
        <p className="text-gray-500 mb-6">{subheading}</p>

        {type === "signup" && (
          <>
            <input
              {...register("name", { required: "Name is required" })}
              placeholder="Name"
              className="w-full px-4 py-2 border rounded-lg mb-3"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </>
        )}

        <input
          {...register("email", { required: "Email is required" })}
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 border rounded-lg mb-3"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

        <input
          {...register("password", { required: "Password is required" })}
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 border rounded-lg mb-3"
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

        <button type="submit" className="bg-blue-600 text-white w-full py-2 mt-4 rounded-lg hover:bg-blue-700">
          {buttonText}
        </button>

        <p className="text-sm text-center mt-4">
          {type === "login" ? (
            <>
              Don’t have an account?{" "}
              <Link to="/signup" className="text-blue-600 hover:underline">Sign up</Link>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">Log in</Link>
            </>
          )}
        </p>
      </form>
    </div>
  );
}

export default AuthForm;
