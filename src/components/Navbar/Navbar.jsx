import { Link, NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };

  const navOptions = (
    <>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "me-6 text-gray-300 text-sm bg-transparent"
              : "me-6 hover:text-gray-300 text-white hover:text-sm hover:bg-transparent"
          }
          to="/"
        >
          HOME
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "me-6 text-gray-300 text-sm bg-transparent"
              : "me-6 hover:text-gray-300 text-white hover:text-sm hover:bg-transparent"
          }
          to="/"
        >
          COLLEGES
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "me-6 text-gray-300 text-sm bg-transparent"
              : "me-6 hover:text-gray-300 text-white hover:text-sm hover:bg-transparent"
          }
          to="/"
        >
          ADMISSION
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "me-6 text-gray-300 text-sm bg-transparent"
              : "me-6 hover:text-gray-300 text-white hover:text-sm hover:bg-transparent"
          }
          to="/"
        >
          MY COLLEGE
        </NavLink>
      </li>
      <li>
        {user ? (
          <>
            <div className="flex items-center -mt-4">
            <div>
            <Link to="/profile">
            <img
              title={user.displayName}
              className="w-12 me-3 mb-3 mt-2 rounded-full"
              src={user.photoURL}
              alt=""
            />
            </Link>
            </div>
            <div>
            <button
              onClick={handleLogOut}
              className="btn me-16 border-none bg-gradient-to-r from-teal-400 to-teal-500 hover:scale-90 rounded px-5 py-1 text-white font-bold"
            >
              LOG OUT
            </button>
            </div>
            </div>
          </>
        ) : (
          <li>
            <Link to="/login">
              <button className="btn me-16 border-none bg-gradient-to-r from-teal-400 to-teal-500 hover:scale-90 rounded px-5 py-1 text-white font-bold -mt-3">
                LOG IN
              </button>
            </Link>
          </li>
        )}
      </li>
    </>
  );
  return (
    <>
      <div className="rounded navbar bg-teal-700 bg-opacity-75 ">
        <div className="navbar-start">
          <div className="dropdown">
            <label
              tabIndex={0}
              className="btn border-none btn-sm bg-green-300 md:hidden"
            >
              <FaBars>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </FaBars>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact
                 dropdown-content p-2 shadow bg-green-400 rounded-box w-48"
            >
              {navOptions}
            </ul>
          </div>
          <div className="flex items-center justify-end mt-2 ms-5">
            <img
              className="md:w-16 w-28 md:ms-0 ms-20"
              src="https://cmsv2-assets.apptegy.net/uploads/272/logo/234/collegeplace.png"
              alt=""
            />
            <p className="md:text-xl text-xs text-white font-bold font-serif uppercase italic">
              College <span className="text-teal-400">Spot</span>
            </p>
          </div>
        </div>
        <div className="navbar-center hidden md:flex ms-40">
          <ul className="flex px-1 md:mt-7">{navOptions}</ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
