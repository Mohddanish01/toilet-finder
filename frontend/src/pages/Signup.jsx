import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

function Signup() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signup } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await signup(
        name,
        email,
        password
      );

      navigate("/login");

    } catch (error) {

      console.log(error.response?.data);

      toast.error("Signup failed");
    }
  };

  return (

    <div className="bg-slate-50 min-h-screen flex items-center justify-center px-6 py-10">

    <div className="w-full max-w-md">

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">

        <h1 className="text-4xl font-bold text-slate-900">

        🚀 Join Toilet Finder

        </h1>

        <p className="text-slate-500 mt-3 mb-8">

        Create your account and help improve public sanitation in your community.

        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

        <div>

          <label className="block text-sm font-semibold text-slate-700 mb-2">

          Full Name

          </label>

          <input
          type="text"
          placeholder="Enter your full name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        <div>

          <label className="block text-sm font-semibold text-slate-700 mb-2">

          Email

          </label>

          <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        <div>

          <label className="block text-sm font-semibold text-slate-700 mb-2">

          Password

          </label>

          <input
          type="password"
          placeholder="Create a password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
          >

          Create Account

        </button>

      </form>
      <div className="text-center mt-6">

        <p className="text-slate-500">

        Already have an account?

        </p>

        <Link
        to="/login"
        className="text-blue-600 hover:underline font-semibold"
        >

        Login

        </Link>

        </div>

      </div>
    </div>

    </div>
  );
}

export default Signup;
