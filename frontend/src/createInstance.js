import axios from "axios";
import { jwtDecode } from "jwt-decode";

const refreshToken = async()=>{
  try {
    const res = await axios.post("http://localhost:8000/v1/auth/refresh", {}, {withCredentials: true})
    return res.data;
  } catch (error) {
    console.log("refresh token that bai", error);
    throw(error);
  }
}

export const createAxios = (user, dispatch, stateSuccess)=>{
  const newInstance = axios.create();
  newInstance.interceptors.request.use(
    async(config)=>{
      let date = new Date();
      const decodedToken = jwtDecode(user?.accessToken);
      if(decodedToken.exp < date.getTime()/1000){
        const data = await refreshToken();
        const refreshUser = {
          ...user,
          accessToken: data.accessToken,
        };
        dispatch(stateSuccess(refreshUser));
        config.headers["token"] = "Bearer " + data.accessToken;
      };
      return config;
    },
    (err)=>{
      return Promise.reject(err);
    }
  );
  return newInstance;
}

// export const createAxios = (user, dispatch, stateSuccess, navigate) => {
//   const newInstance = axios.create();

//   newInstance.interceptors.request.use(
//     async (config) => {
//       let date = new Date();

//       const decodedToken = jwtDecode(user.accessToken);
//       if(decodedToken.exp < date.getTime() /1000){
//         const data = await refreshToken();
//         const refreshUser = {
//           ...user,
//           accessToken: data.accessToken,
//         };
//         dispatch(stateSuccess(refreshUser));
//         config.headers["token"] = "Bearer " + data.accessToken;
//       }
//       return config;
//     },
//     (err) =>{
//       return Promise.reject(err);
//     }
//   );

//   return newInstance;
// };