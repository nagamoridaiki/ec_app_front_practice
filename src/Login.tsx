import React from 'react';
import './SignIn.css'; // Reusing existing CSS for the header part

function Login() {
  // Implement the state and logic for login items here

  return (
    <div className="signin-container">
      <h1>Login</h1>
      <form className="signin-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
        </div>

        <button type="submit" className="signin-button">Login</button>
      </form>
    </div>
  );
}

export default Login;
