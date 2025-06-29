import { useEffect, useRef, useState } from "react";

const ListTask = ({ listTask, onDelete, onUpdate, editTask, setEditTask }) => {
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [isMoreOpenId, setIsMoreOpenId] = useState(null);

  const topMoreRef = useRef({});
  const toggleMoreRef = useRef({});

  useEffect(() => {
    const handleClickOutSite = (e) => {
      const toggleEl = toggleMoreRef.current[isMoreOpenId];
      const topEl = topMoreRef.current[isMoreOpenId];

      if (
        isMoreOpenId &&
        toggleEl &&
        topEl &&
        !toggleEl.contains(e.target) &&
        !topEl.contains(e.target)
      ) {
        setIsMoreOpenId(null);
      }
    };

    document.addEventListener("click", handleClickOutSite);
    return () => {
      document.removeEventListener("click", handleClickOutSite);
    };
  }, [isMoreOpenId]);

  const handleToggleMore = (taskId) => {
    setIsMoreOpenId((prevId) => (prevId === taskId ? null : taskId));
  };

  const handleEditTask = (task) => {
    setEditTask(task);
    setEditTitle(task.Title);
    setEditContent(task.Content);
  };
  const handleSavedTask = (taskId) => {
    const updatedTask = {
      Title: editTitle,
      Content: editContent,
    };
    onUpdate(taskId, updatedTask);
  };

  return (
    <div className="w-[350px] lg:w-[1100px] mx-auto mt-10 bg-white rounded-3xl p-5">
      <h2 className="text-xl font-bold mb-4">Danh sách ghi chú:</h2>
      <ul className="space-y-3">
        {listTask.map((task) => (
          <div key={task._id} className="flex">
            <li className="p-3 w-[1050px] bg-slate-100 rounded-xl">
              {editTask?._id === task._id ? (
                <div>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                  <input
                    type="text"
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                  />
                </div>
              ) : (
                <div>
                  <h3 className="font-semibold text-lg">{task.Title}</h3>
                  <p className="text-gray-600">{task.Content}</p>
                </div>
              )}
            </li>
            <button
              ref={(el) => (toggleMoreRef.current[task._id] = el)}
              onClick={() => {
                handleToggleMore(task._id);
              }}
              className="absolute right-10 lg:right-24 pt-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                />
              </svg>
            </button>
            {isMoreOpenId === task._id && (
              <div
                ref={(el) => (topMoreRef.current[task._id] = el)}
                className="absolute w-28 h-16 bg-white rounded-lg shadow-xl right-16 lg:right-32 mt-1 text-red-600 flex flex-col justify-center space-y-1 "
              >
                <button className="hover:bg-slate-100 w-20 mx-auto"
                  onClick={() => {
                    onDelete(task._id);
                  }}
                >
                  xóa
                </button>
                {editTask?._id === task._id ? (
                  <button onClick={() => handleSavedTask(task._id)} className="hover:bg-slate-100 w-20 mx-auto">Lưu</button>
                ) : (
                  <button onClick={() => handleEditTask(task)} className="hover:bg-slate-100 w-20 mx-auto">Sửa</button>
                )}
              </div>
            )}
          </div>
        ))}
      </ul>
    </div>
  );
};

export default ListTask;
