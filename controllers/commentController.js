const Comment = require('../models/comment');

// Lấy tất cả comments kèm thông tin article
exports.findAll = async (req, res) => {
  try {
    const comments = await Comment.find().populate('article');
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Tạo comment mới
exports.create = async (req, res) => {
  try {
    const comment = new Comment(req.body);
    await comment.save();
    res.status(201).json(comment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Cập nhật comment theo id
exports.update = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!comment) return res.status(404).json({ message: "Comment not found." });
    res.json(comment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Xóa comment theo id
exports.delete = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment) return res.status(404).json({ message: "Comment not found." });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Lấy 1 comment theo id (populate article)
exports.findById = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id).populate('article');
    if (!comment) return res.status(404).json({ message: "Comment not found." });
    res.json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
