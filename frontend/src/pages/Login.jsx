import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await login(email, password);

      navigate("/");

    } catch (error) {

      console.log(error);

      alert("Invalid credentials");
    }
  };

  return (

    <div className="bg-slate-50 min-h-screen flex items-center justify-center px-6 py-10">

    <div className="w-full max-w-md">

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">

        <h1 className="text-4xl font-bold text-slate-900">

        👋 Welcome Back

        </h1>

        <p className="text-slate-500 mt-3 mb-8">

        Sign in to access toilets, reviews and community features.

        </p>

        <form
        onSubmit={handleSubmit}
        className="space-y-5"
        >

        <div>

          <label className="block text-sm font-semibold text-slate-700 mb-2">

          Email

          </label>

          <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          </div>

        <div>

          <label className="block text-sm font-semibold text-slate-700 mb-2">

          Password

          </label>

          <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          </div>

        <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
        >

        Login

        </button>

      </form>

      <div className="text-center mt-6">

        <p className="text-slate-500">

        Don't have an account?

        </p>

        <Link
        to="/signup"
        className="text-blue-600 hover:underline font-semibold"
        >

        Create one

        </Link>

        </div>

        </div>

      </div>

    </div>
  );
}

export default Login;
