import React from 'react';
import './SignIn.css'; // ヘッダーの部分のみ既存のCSSを再利用

function SignIn() {
  // カートアイテムの状態やロジックをここに実装

  return (
    <div className="signin-container"> {/* 横幅を調整 */}
      <h1>Sign In</h1>
      <form className="signin-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
        </div>

        <button type="submit" className="signin-button">Sign In</button>
      </form>
    </div>
  );

}

export default SignIn;
