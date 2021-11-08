const express = require("express");
const { addProject, editProject, delProject, searchProject } = require("../controllers/projectController");
const router = express.Router();

//routing for each api
router.route('/add').post(addProject);
router.route('/delete').post(delProject)
router.route('/edit').post(editProject);
router.route('/search').post(searchProject);
module.exports = router;