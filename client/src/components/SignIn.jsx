import React, { useState } from 'react';

// ref: https://www.youtube.com/watch?v=Rp9LgClUIYc
export const SignIn = () => {
  const [role, setRole] = useState('user'); // Toggle between admin and user
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between Sign In and Sign Up


  return (
    <div className="flex w-full h-screen">
      {/* Left Half */}
      <div className="w-full lg:w-1/2 h-full flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">
          {isSignUp ? 'Create an Account' : 'Welcome Back'}
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          {isSignUp ? 'Please fill in the details to sign up.' : 'Please enter your details.'}
        </p>
        <div className="w-3/4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email address</label>
            <input
              type="email"
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Enter your password"
            />
          </div>
          {isSignUp && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Confirm your password"
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              {isSignUp ? "Sign up as" : "Sign in as"}
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
            >
              <option value="user">Normal User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button className="w-full bg-black text-white py-2 rounded-md hover:bg-slate-800">
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
          <p className="text-sm text-center mt-4">
            {isSignUp ? (
              <div>
                Already have an account?{' '}
                <span
                  className="text-blue-500 cursor-pointer hover:underline"
                  onClick={() => setIsSignUp(false)}
                >
                  Sign In
                </span>
              </div>
            ) : (
              <div>
                Don&apos;t have an account?{' '}
                <span
                  className="text-blue-500 cursor-pointer hover:underline"
                  onClick={() => setIsSignUp(true)}
                >
                  Sign Up
                </span>
              </div>
            )}
          </p>
        </div>
      </div>

      {/* Right Half */}
      <div className="relative hidden lg:flex w-1/2 h-full items-center justify-center bg-black">
        <div
          className="w-60 h-60 bg-gradient-to-tr from-violet-200 
        via-fuchsia-200 to-pink-400 rounded-full animate-bounce"
        ></div>
        <div className="w-full h-1/2 absolute bottom-0 backdrop-blur-lg"></div>
      </div>
    </div>
  );
};
