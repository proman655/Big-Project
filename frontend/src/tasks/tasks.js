import React from "react";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import TaskTable from "../components/user_tasks/user_tasks";

const Tasks = () => {
    return (
        <div>
            <Header/>
            <TaskTable/>
            <Footer/>
        </div>
    )
}

export default Tasks