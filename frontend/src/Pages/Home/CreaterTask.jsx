const CreateTask = ({handleAddTask,setTitle,setContent,title,content})=>{
    return(
        <div className="">
        <div className="mt-24"></div>
        <div className="w-[300px] lg:w-[400px] h-[250px] space-y-3 mx-auto bg-white rounded-3xl">
          <h1 className="font-bold text-xl lg:text-2xl text-center p-3">Danh sách việc cần làm</h1>
          <form
            onSubmit={handleAddTask}
            className="space-y-4 flex flex-col items-center"
          >
            <input
              type="text"
              value={title}
              placeholder="Nhập nội dung tiêu đề vào đây"
              className="bg-slate-200 rounded-3xl pl-5 w-[250px] lg:w-80 h-10 outline-none placeholder-slate-500 placeholder:text-xm "
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              value={content}
              placeholder="Nhập nội dung mô tả vào đây"
              className="bg-slate-200 rounded-3xl pl-5 w-[250px] lg:w-80 h-10 outline-none placeholder-slate-500 placeholder:text-xm"
              onChange={(e) => setContent(e.target.value)}
            />

            <button className=" bg-amber-600 w-28 h-12 rounded-3xl hover:bg-amber-500 text-white ">
              Thêm
            </button>
          </form>
        </div>
      </div>
    )
}
export default CreateTask;