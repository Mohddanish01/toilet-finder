import { useAuth }
from "../context/AuthContext";

function Login() {

  const { login } = useAuth();

  const handleLogin = async () => {

    await login(
      "your_email@gmail.com",
      "your_password"
    );
  };

  return (
    <button onClick={handleLogin}>
      Login
    </button>
  );
}

export default Login;
