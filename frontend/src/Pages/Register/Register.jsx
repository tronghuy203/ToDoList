import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../redux/apiAuth";
import { useDispatch } from "react-redux";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const newUser = {
      email,
      password,
      username,
      confirmPassword,
    };
    registerUser(newUser, dispatch, navigate);
  };

  return (
    <div className="mt-14 bg-gradient-to-br from-cyan-700 via-teal-600 to-teal-400 h-full">
      <div className="w-full flex flex-col items-center justify-center pt-10">
        <div className="w-[350px] lg:w-[420px] flex flex-col bg-white/20 rounded-2xl mb-5">
          <form className="space-y-6" onSubmit={handleRegister}>
            <h1 className="font-bold text-3xl text-white text-center mt-4">
              Đăng ký
            </h1>
            <div className="flex flex-col">
              <label className="ml-5 text-white">Email</label>
              <input
                type="email"
                placeholder="Nhập email của bạn"
                className="mx-auto w-80 lg:w-96 h-10 px-3 mt-2 rounded-lg"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label className="ml-5 text-white">Tên người dùng</label>
              <input
                type="text"
                placeholder="Nhập tên của bạn"
                className="mx-auto w-80 lg:w-96 h-10 px-3 mt-2 rounded-lg"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label className="ml-5 text-white">Mật khẩu</label>
              <input
                type="password"
                placeholder="Nhập mật khẩu của bạn"
                className="mx-auto w-80 lg:w-96 h-10 px-3 mt-2 rounded-lg"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label className="ml-5 text-white">Nhập lại mật khẩu</label>
              <input
                type="password"
                placeholder="Nhập lại mật khẩu"
                className="mx-auto w-80 lg:w-96 h-10 px-3 mt-2 rounded-lg"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-center">
              <button className="bg-gradient-to-r from-blue-700 to-blue-500 w-28 h-11 text-white  rounded-2xl">
                Đăng ký
              </button>
            </div>
            <div className="flex justify-center">
              <h4 className="text-white text-center mb-5">
                Bạn đã có tài khoản.
              </h4>
              <Link to="/login" className="ml-1 text-blue-800">
                Đăng nhập ngay
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
