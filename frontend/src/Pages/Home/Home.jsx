import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addTask,
  deleteTask,
  getTask,
  updateTask,
} from "../../redux/apiTodolist";
import { createAxios } from "../../createInstance";
import { loginSuccess } from "../../redux/authSlice";
import ListTask from "./ListTask";
import CreateTask from "./CreaterTask";

const Home = () => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const listTask = useSelector((state) => state.todolist.gettodolist.listTask);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = user?.accessToken;
  const axiosJWT = useMemo(()=>createAxios(user, dispatch, loginSuccess),[user, dispatch])

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editTask, setEditTask] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      getTask(dispatch, accessToken, axiosJWT);
    }
  }, [user, dispatch, accessToken, axiosJWT, navigate]);

  const handleAddTask = async (e) => {
    e.preventDefault();
    const newTask = {
      Title: title,
      Content: content,
    };
    await addTask(newTask, dispatch, accessToken, axiosJWT);
    alert("Bạn đã thêm ghi chú mới");
    setTitle("");
    setContent("");
    await getTask(dispatch, accessToken, axiosJWT);
  };
  const handleDeleteTask = async (id) => {
    await deleteTask(id, dispatch, accessToken, axiosJWT);
    await getTask(dispatch,accessToken,axiosJWT)
  };
  const handleUpdateTask = async (id,updateNewTask) => {
    await updateTask(id, updateNewTask, dispatch, accessToken, axiosJWT);
    alert("Cập nhật ghi chú thành công")
    setEditTask(null);
    await getTask(dispatch, accessToken, axiosJWT);

  };
  return (
    <div className="relative w-full h-full ">
      <div className="fixed inset-0 bg-gradient-to-br from-blue-800 to-purple-800 opacity-80 z-0"></div>
      <div className="relative z-10 mt-24">
        <CreateTask 
          handleAddTask={handleAddTask}
          setTitle={setTitle}
          setContent={setContent}
          title={title}
          content={content}
        ></CreateTask>
      </div>
      <div className="relative z-10">
        <ListTask
          listTask={listTask}
          onDelete={handleDeleteTask}
          onUpdate={handleUpdateTask}
          editTask={editTask}
          setEditTask={setEditTask}
        ></ListTask>
      </div>
    </div>
  );
};

export default Home;
