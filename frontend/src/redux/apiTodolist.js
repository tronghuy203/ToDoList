import {
  createtodolistFailed,
  createtodolistStart,
  createtodolistSuccess,
  deletetodolistFailed,
  deletetodolistStart,
  deletetodolistSuccess,
  gettodolistFailed,
  gettodolistStart,
  gettodolistSuccess,
  updatetodolistFailed,
  updatetodolistStart,
  updatetodolistSuccess,
} from "./todolistSlice";

export const addTask = async (task, dispatch, accessToken, axiosJWT) => {
  dispatch(createtodolistStart());
  try {
    await axiosJWT.post(
      "http://localhost:8000/v1/todolist/addtask",
      task,
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );
    dispatch(createtodolistSuccess());
  } catch (error) {
    dispatch(createtodolistFailed());
  }
};
export const getTask = async (dispatch, accessToken, axiosJWT) => {
  dispatch(gettodolistStart());
  try {
    const res = await axiosJWT.get(`http://localhost:8000/v1/todolist`, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(gettodolistSuccess(res.data));
  } catch (error) {
    dispatch(gettodolistFailed());
  }
};

export const updateTask = async(id,updateTask, dispatch,accessToken, axiosJWT)=>{
  dispatch(updatetodolistStart());
  try {
    const res = await axiosJWT.put(`http://localhost:8000/v1/todolist/${id}`,updateTask,{
      headers: {token: `Bearer ${accessToken}`}
    }) 
    dispatch(updatetodolistSuccess(res.data))
  } catch (error) {
    dispatch(updatetodolistFailed())
  }
}

export const deleteTask = async(id,dispatch,accessToken, axiosJWT)=>{
  dispatch(deletetodolistStart());
  try {
    await axiosJWT.delete(`http://localhost:8000/v1/todolist/${id}`,{
      headers: {token: `Bearer ${accessToken}`}
    }) 
    dispatch(deletetodolistSuccess())
  } catch (error) {
    dispatch(deletetodolistFailed())
  }
}