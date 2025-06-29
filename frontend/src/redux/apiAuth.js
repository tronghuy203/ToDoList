import axios from "axios";
import { loginFailed, loginStart, loginSuccess, logoutFailed, logoutStart, logoutSuccess, registerFailed, registerStart, registerSuccess } from "./authSlice";

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("http://localhost:8000/v1/auth/login", user);
    dispatch(loginSuccess(res.data));
    navigate("/");
  } catch (error) {
    dispatch(loginFailed());
  }
};

export const registerUser = async(newUser, dispatch, navigate)=>{
  dispatch(registerStart())
  try {
    const res = await axios.post("http://localhost:8000/v1/auth/register", newUser);
    dispatch(registerSuccess(res.data));
    navigate("/login")
  } catch (error) {
    dispatch(registerFailed())
  }
}

export const logoutUser = async(dispatch, id, accessToken, navigate, axiosJWT) => {
  dispatch(logoutStart())
  try {
    await axiosJWT.post("http://localhost:8000/v1/auth/logout", id,{
      headers: {token: `Bearer ${accessToken}`},
    })
    dispatch(logoutSuccess())
    navigate("/login")
  } catch (error) {
    dispatch(logoutFailed())
  }
}
