import { signInWithGoogle } from '../Firebase';

function Login({ setUser }) {
  const handleSignIn = () => {
    signInWithGoogle().then(user => {
      const {uid, displayName, photoURL} = user
      const userObj = {uid, displayName, photoURL}
      localStorage.setItem('user', JSON.stringify(userObj))
      setUser(user);
    });
  };

  return (
    <div className='bg-[#1aac83] border-0 p-2.5 rounded cursor-pointer text-[#fff] inline-block'>
      {/* Your login form code here */}
      <button onClick={handleSignIn}>Sign in with Google</button>
    </div>
  );
}

export default Login;