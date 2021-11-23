const express = require("express");
const {
  getNotes,
  createNote,
  getNoteById,
  UpdateNote,
  DeleteNote,
  favoriteNote,
  getFavorite
} = require("../controllers/noteControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(protect, getNotes);
router.route("/create").post(protect, createNote);
router.route("/favorite").put(protect, favoriteNote);
router.route("/favList").get(protect, getFavorite);
router
  .route("/:id")
  .get(getNoteById)
  .put(protect, UpdateNote)
  .delete(protect, DeleteNote);

module.exports = router;
