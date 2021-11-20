import React from 'react'
import Container from 'react-bootstrap/Container'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css';
import './user_tasks.css'

const  TaskTable = () => {

    return (
        <Container className="table-container">

            <DropdownButton id="dropdown-basic-button" title="Sort">
                <Dropdown.Item href="#/action-3">Title</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Project</Dropdown.Item>
                <Dropdown.Item href="#/action-1">Date due</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Difficulty</Dropdown.Item>
            </DropdownButton>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Task</th>
                        <th>Project</th>
                        <th>Date due</th>
                        <th>Difficulty</th>
                        <th>Completed</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Finish APIs</td>
                        <td>This Project</td>
                        <td>11/22/2021</td>
                        <td>Medium</td>
                        <td><Form.Check/></td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Finish Auth</td>
                        <td>This Project</td>
                        <td>11/25/2021</td>
                        <td>Medium</td>
                        <td><Form.Check /></td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Finish Mobile App</td>
                        <td>This Project</td>
                        <td>11/30/2021</td>
                        <td>Hard</td>
                        <td><Form.Check /></td>
                    </tr>
                </tbody>
            </Table>
        </Container>

    )
}

export default TaskTable