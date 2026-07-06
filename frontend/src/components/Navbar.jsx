// import { Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// function Navbar() {

//   const { user, logout } = useAuth();

//   return (
//     <nav className="bg-blue-600 text-white p-4">

//       <Link to="/">Home</Link>

//       {" | "}

//       {!user ? (
//         <>
//           <Link to="/login">Login</Link>

//           {" | "}

//           <Link to="/signup">Signup</Link>
//         </>
//       ) : (
//         <>
//           <Link to="/add-toilet">
//             Add Toilet
//           </Link>

//           {" | "}

//           <Link to="/my-demands">
//             My Demands
//           </Link>

//           {" | "}

//           <span>
//             {user.name}
//           </span>

//           {" | "}

//           <button onClick={logout}>
//             Logout
//           </button>
//         </>
//       )}

//     </nav>
//   );
// }

// export default Navbar;

import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { MapPinned, PlusCircle, LayoutDashboard, Flag, LogOut, User } from "lucide-react";

function Navbar() {

  const { user, logout } = useAuth();

  return (

    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-200">

      <div className="max-w-7xl mx-auto px-6">

        <div className="flex items-center justify-between h-16">

          {/* Logo */}

          <Link
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

          </Link>

          {/* Navigation */}

          <div className="hidden md:flex items-center gap-8">

            <NavLink
              to="/"
              className="text-slate-600 hover:text-blue-600 transition"
            >
              Home
            </NavLink>

            <NavLink
              to="/map"
              className="text-slate-600 hover:text-blue-600 transition"
            >
              Explore Map
            </NavLink>

            {
              user && (
                <>
                  <NavLink
                    to="/add-toilet"
                    className="text-slate-600 hover:text-blue-600 transition"
                  >
                    Add Toilet
                  </NavLink>

                  <NavLink
                    to="/dashboard"
                    className="text-slate-600 hover:text-blue-600 transition"
                  >
                    Dashboard
                  </NavLink>

                  <NavLink
                    to="/my-demands"
                    className="text-slate-600 hover:text-blue-600 transition"
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

                <Link
                  to="/login"
                  className="px-5 py-2 rounded-xl border border-slate-300 hover:bg-slate-100 transition"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="px-5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                  Signup
                </Link>

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