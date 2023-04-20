import { useState } from 'react';
import './AuthPage.css';
import LoginForm from '../../components/LoginForm/LoginForm';
import SignUpForm from '../../components/SignUpForm/SignUpForm';

export default function AuthPage({ setUser }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <main className="AuthPage">
      <div className="header">
        <h1>KaijuCast</h1>
        <p>Your one stop shop for Kaiju sized weather!</p>
      </div>
      <div className="content">
        {showLogin ? <LoginForm setUser={setUser} /> : <SignUpForm setUser={setUser} />}
        <h3 onClick={() => setShowLogin(!showLogin)}>{showLogin ? 'New Here? Sign up!' :'Got an account? Log In'}</h3>
      </div>
    </main>
  );
}