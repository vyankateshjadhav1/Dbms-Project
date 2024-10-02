import { SignUp } from '@clerk/clerk-react';

function SignUpPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Create Your Account</h1>
        <SignUp />
      </div>
    </div>
  );
}

export default SignUpPage;
