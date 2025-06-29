import { NavLink, Link, useNavigate } from "react-router-dom";
import { ArrowLeftCircleIcon, HomeIcon } from "@heroicons/react/24/outline";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/apiAuth";
import { createAxios} from "../../createInstance"
import { loginSuccess } from "../../redux/authSlice";

const Navbar = () => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = user?.accessToken;
  const id = user?.id;
  const axiosJWT = createAxios(user, dispatch, loginSuccess)

  const topMenuRef = useRef();
  const toggleIconRef = useRef();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleClickOutSide = (e) => {
      if (
        topMenuRef.current &&
        !topMenuRef.current.contains(e.target) &&
        toggleIconRef.current &&
        !toggleIconRef.current.contains(e.target)
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutSide);
    return () => {
      document.removeEventListener("click", handleClickOutSide);
    };
  });

  const handleLogout = async()=>{
    await logoutUser(dispatch,id, accessToken, navigate, axiosJWT)

  }
  const handleToggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-100 shadow-sm border-y-2">
      <div className="w-screen px-4 py-2">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="https://static.vecteezy.com/system/resources/previews/024/043/963/original/book-icon-clipart-transparent-background-free-png.png"
              alt=""
              className="w-10 h-10"
            />
            <h1 className="font-bold">Todolist</h1>
          </Link>

          <div className="hidden lg:flex space-x-3">
            {user ? (
              <>
                <NavItem
                to="/"
                icon={<HomeIcon className="w-5 h-5" />}
                text="Trang chủ"
              ></NavItem>
              <div className="flex items-center space-x-2">
                <span>Hi,</span>
                <span>{user.username}</span>

              </div>
              <button onClick={handleLogout} className="flex items-center space-x-1">
                <ArrowLeftOnRectangleIcon className="w-5 h-5 text-red-600"/>                
                <span className="text-red-600">Đăng xuất</span>
              </button>
              </>   
            ) : (
              <>
                <NavItem
                  to="/login"
                  icon={<ArrowLeftOnRectangleIcon className="w-5 h-5" />}
                  text="Đăng nhập"
                ></NavItem>
                <NavItem
                  to="/register"
                  icon={<UserPlusIcon className="w-5 h-5" />}
                  text="Đăng ký"
                ></NavItem>
              </>
            )}
          </div>

          <button
            ref={toggleIconRef}
            onClick={handleToggleMenu}
            className="lg:hidden p-2 hover:bg-gray-300 rounded-md"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        {isMenuOpen && (
          <div
            ref={topMenuRef}
            className="lg:hidden flex flex-col items-center bg-slate-100  border-t shadow-lg space-y-3  "
          >
           {user ? (
            <>
               <MobileNavBar
              to="/"
              icon={<HomeIcon className="w-5 h-5" />}
              text="Trang chủ"
            />
             <div className="flex items-center space-x-2">
                <span>Hi,</span>
                <span>{user.username}</span>

              </div>
              <button onClick={handleLogout} className="flex items-center space-x-1">
                <ArrowLeftOnRectangleIcon className="w-5 h-5 text-red-600"/>                
                <span className="text-red-600">Đăng xuất</span>
              </button>
           
            </>
           ):(
            <>
             <MobileNavBar
              to="/login"
              icon={<ArrowLeftCircleIcon className="w-5 h-5" />}
              text="Đăng nhập"
            />
            <MobileNavBar
              to="/register"
              icon={<UserPlusIcon className="w-5 h-5" />}
              text="Đăng ký"
            />
            </>
           )}
          </div>
        )}
      </div>
    </nav>
  );
};
const NavItem = ({ to, icon, text, onClick }) => {
  return (
    <NavLink
      to={to}
      icon={icon}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center px-4 py-2 rounded-xl space-x-2 ${
          isActive
            ? "text-white bg-cyan-500"
            : "text-gray-600 hover:bg-gray-100"
        }`
      }
    >
      {icon}
      <span>{text}</span>
    </NavLink>
  );
};

const MobileNavBar = ({ to, icon, onClick, text }) => {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center px-4 py-3 rounded-lg space-x-2 ${
          isActive
            ? "text-white bg-cyan-500"
            : "text-gray-600 hover:bg-gray-100 "
        }`
      }
    >
      {icon}
      <span>{text}</span>
    </NavLink>
  );
};

export default Navbar;
