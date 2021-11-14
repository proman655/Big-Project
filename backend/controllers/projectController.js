const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
const mongoose = require('mongoose');
const Project= require("../models/projectModel");


const addProject = asyncHandler(async (req, res) => {
    const { projectTitle, projectManager, projectDescription, projectStatus, projectStartDate,projectEndDate,users } = req.body;
    //check for duplicate project title?

    //create project
    const project = await Project.create({
        projectTitle,
        projectManager,
        projectDescription,
        projectStatus,
        projectStartDate,
        projectEndDate,
        users
    });

    if (project) {
        res.status(201).json({
            projectTitle: project.projectTitle,
            projectManager: project.projectManager,
            projectDescription: project.projectDescription,
            projectStatus: project.projectStatus,
            projectStartDate: project.projectStartDate,
            projectEndDate: project.projectEndDate,
            users: project.user,
            token: generateToken(project._id),
        });
      } else {
        res.status(400);
        throw new Error("Error Occured");
      }
    
});

const delProject = asyncHandler(async (req, res) => {
    const { projectTitle} = req.body;

    //gets project title to delete project
    const del = mongoose.model('Project',{
        projectTitle: {type: String}
    });

    del.remove({projectTitle: projectTitle}, function(err, result) {
        if(err){
            throw new Error("Error Occured");
        } else{
            res.json(result);
        }
    });


});

const editProject = asyncHandler(async (req, res) => {

});

const searchProject = asyncHandler(async (req, res) => {

});

module.exports = { delProject, addProject, editProject, searchProject };