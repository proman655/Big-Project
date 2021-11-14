const mongoose = require('mongoose');

const projectSchema = mongoose.Schema(
    {
        projectTitle:{
            type: String,
            required: true,
        },
        projectManager:{
            type: String,
            required: true,
        },
        projectDescription:{
            type: String,
            required: true,
        },
        projectStatus:{
            type: String,
            required: true,
        },
        //don't know how to implement actual dates ;/
        projectStartDate:{
            type: String,
            required: true,
        },
        projectEndDate:{
            type: String,
            required: false
        },
        //in future change require type to true but for testing leave as false.
        users:{
            type: Array,
            id:{
                type: String,
            },
            required: false,
        },
}
);


const Project = mongoose.model("project",projectSchema);

module.exports = Project;
