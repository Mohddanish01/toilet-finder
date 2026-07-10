import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { MapPinned, PlusCircle, LayoutDashboard, Flag, LogOut, User } from "lucide-react";

function Navbar() {

  const { user, logout } = useAuth();

  const navLinkClass = ({ isActive }) =>
  `px-4 py-2 rounded-xl font-medium transition ${
    isActive
      ? "bg-blue-600 text-white shadow-md"
      : "text-slate-600 hover:text-blue-600 hover:bg-slate-100"
  }`;

  return (

    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-200">

      <div className="max-w-7xl mx-auto px-6">

        <div className="flex items-center justify-between h-16">

          {/* Logo */}

          <NavLink
            to="/"
            className="flex items-center gap-2"
          >

            <div className="bg-blue-600 p-2 rounded-xl">

              <MapPinned
                className="text-white"
                size={22}
              />

            </div>

            <div>

              <h1 className="text-xl font-bold text-slate-800">
                ToiletFinder
              </h1>

              <p className="text-xs text-slate-500">
                Public Toilet Locator
              </p>

            </div>

          </NavLink>

          {/* Navigation */}

          <div className="hidden md:flex items-center gap-8">

            <NavLink
              to="/"
              className={navLinkClass}
            >
              Home
            </NavLink>

            {
              user && (
                <>
                  <NavLink
                    to="/add-toilet"
                    className={navLinkClass}
                  >
                    Add Toilet
                  </NavLink>

                  <NavLink
                    to="/add-demand"
                    className={navLinkClass}
                  >
                    Add Demand
                  </NavLink>

                  <NavLink
                    to="/dashboard"
                    className={navLinkClass}
                  >
                    Dashboard
                  </NavLink>

                  <NavLink
                    to="/my-demands"
                    className={navLinkClass}
                  >
                    My Demands
                  </NavLink>
                </>
              )
            }

          </div>

          {/* Right Side */}

          {
            !user ? (

              <div className="flex gap-3">

                <NavLink
                  to="/login"
                  className={navLinkClass}
                >
                  Login
                </NavLink>

                <NavLink
                  to="/signup"
                  className={navLinkClass}
                >
                  Signup
                </NavLink>

              </div>

            ) : (

              <div className="flex items-center gap-4">

                <div className="flex items-center gap-2">

                  <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center">

                    <User
                      size={18}
                      className="text-white"
                    />

                  </div>

                  <span className="font-medium text-slate-700">

                    {user.name}

                  </span>

                </div>

                <button
                  onClick={logout}
                  className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition"
                >

                  <LogOut size={18} />

                  Logout

                </button>

              </div>

            )
          }

        </div>

      </div>

    </nav>

  );

}

export default Navbar;