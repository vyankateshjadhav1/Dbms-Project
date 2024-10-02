import { SignIn } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Sign In to Your Account</h1>
        <SignIn 
          signUpUrl="/signup"
        />
      </div>
    </div>
  );
}

export default Login;
