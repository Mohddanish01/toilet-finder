import { useAuth }
from "../context/AuthContext";

function Login() {

  const { login } = useAuth();

  const handleLogin = async () => {

    await login(
      "danish@gmail.com",
      "123456"
    );
  };

  return (
    <button onClick={handleLogin}>
      Login
    </button>
  );
}

export default Login;
