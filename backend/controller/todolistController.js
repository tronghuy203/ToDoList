const Todolist = require("../model/Todolist");

const todolistController = {
  addTask: async (req, res) => {
    try {
      const { Title, Content } = req.body;
      const newTask = new Todolist({ 
        Title,
        Content, 
        UserId: req.user.id,
      });
      const savedTask = await newTask.save();
      res.status(201).json(savedTask);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  getAllTask: async (req, res) => {
    try {
      const UserId = req.user.id;
      const getalltask = await Todolist.find({UserId});
      res.status(200).json(getalltask);
    } catch (error) {
      console.log(error)
      return res.status(500).json(error);
    }
  },
  updateTask: async (req, res) => {
    try {
      const task = await Todolist.findById(req.params.id);
      if (task.UserId.toString() !== req.user.id ) {
        return res
          .status(403)
          .json({ message: "Bạn chỉ có thể cập nhật ghi chú của mình" });
      }
      const updatetask = await Todolist.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true, runValidators: true }
      );
      res.status(200).json(updatetask);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  deleteTask: async(req,res) =>{
    try {
      const task = await Todolist.findById(req.params.id);
      if(!task){
        return res.status(403).json("ghi chú không tồn tại");
      }
      if(task.UserId.toString() !== req.user.id){
        return res.status(401).json("Bạn chỉ có thể xóa ghi chú của bạn")
      }
      const deleteTask = await Todolist.findByIdAndDelete(req.params.id);
      res.status(200).json({message:"ghi chú đã được xóa"});
    } catch (error) {
      console.log(error)
      return res.status(500).json(error);
    }
  }
};

module.exports = todolistController;
