import { useState } from "react";
import { loginUser } from "../../redux/apiAuth";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin =(e)=>{
        e.preventDefault();
        const User = {
            email,  
            password
        };
        loginUser(User,dispatch, navigate)
    }
  return (
    <div className="mt-14 bg-gradient-to-br from-cyan-700 via-teal-600 to-teal-400 h-screen ">
      <div className="w-full flex flex-col items-center justify-center pt-10">
        <div className="w-[350px] lg:w-[420px] bg-white/20 backdrop-blur-lg flex flex-col rounded-2xl">
          <form className="space-y-6" onSubmit={handleLogin}>
            <h1 className="font-bold text-white text-center text-3xl mt-4">
              Đăng nhập
            </h1>
            <div className="flex flex-col">
              <label htmlFor="email" className="ml-5 text-white">
                Email
              </label>
              <input
                type="email"
                placeholder="Nhập email của bạn"
                className="mx-auto w-80 lg:w-96 h-10 px-3 mt-2 rounded-lg"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className="ml-5 text-white">
                Password
              </label>
              <input
                type="password"
                placeholder="Nhập mật khẩu của bạn"
                className="mx-auto w-80 lg:w-96 h-10 px-3 mt-2 rounded-lg"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-center">
              <button className="bg-gradient-to-r from-blue-700 to-blue-500 w-28 h-11 rounded-2xl text-white ">
                Đăng nhập
              </button>
            </div>
            <div className="pb-5 flex justify-center">
              <h4 className="text-white text-center">
                Bạn chưa có tài khoản.
              </h4>
              <Link to="/register" className="ml-1 text-blue-800">Đăng ký ngay</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
