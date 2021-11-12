import React from "react";
import { NavLink, Link } from 'react-router-dom'
import Placehholder from "../../pictures/card-placeholder.jpg"
import CreateProjectButton from "../../pictures/create-project-button.png"
import CancelButton from "../../pictures/cancel-button.png"
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import 'bootstrap/dist/css/bootstrap.min.css';
import './feed.css'


function MyVerticallyCenteredModal(props) {
    return (
        <Modal className="modal"
            {...props}
            dialogClassName="modal-80w"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton className="modal-header">
                <Modal.Title id="contained-modal-title-vcenter">
                    Create New Project
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body">
                <Form className="new-project-form">
                    <div className="new-project-form-group">
                        <input type="text" name="Title" placeholder="Title" className="new-project-input"></input>
                    </div>
                    <div className="new-project-form-group">
                        <input type="text" name="Project Manager" placeholder="Project manager" className="new-project-input"></input>
                    </div>
                    <div className="new-project-form-group">
                        <input type="date" name="dueDate" className="new-project-input"></input>
                    </div>
                    <div className="new-project-form-group">
                        <select aria-label="Default select example" className="new-project-input">
                            <option>None</option>
                            <option value="1">Tev</option>
                            <option value="2">Chris</option>
                            <option value="3">Gus</option>
                            <option value="3">Pedro</option>
                        </select>
                    </div>
                    <div className="new-project-form-group-box">
                        <textarea type="text" name="Project Manager" placeholder="Description" className="new-project-input" id="textBox"></textarea>
                    </div>
               
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <button className="new-project-button">
                    <img src={CreateProjectButton} alt="submit" />
                </button>
                <button onClick={props.onHide} className="new-project-button">
                    <img src={CancelButton} alt="cancel"/>
                </button>
                    
              
            </Modal.Footer>
        </Modal>
    );
}

const Feed = () => {

    const [modalShow, setModalShow] = React.useState(false);

    return (

        <Container className="feed-container">

            <div className="edit-button-div">
                <button id="edit-button"/>
            </div>

            <div className="cards-div">
                <Row xs={1} md={3} className="g-4">
                    {Array.from({ length: 3}).map((_, idx) => (
                        <Col>
                            <Card className="card">
                                <Card.Img variant="top" src={Placehholder} className="card-picture"/>
                                <Card.Header>
                                    <small className="text-muted">Date due 12/01/2021</small>
                                </Card.Header>
                                <Card.Body className="card-body">
                                    <Card.Title>Project Title</Card.Title>
                                    <Card.Text>
                                        This is a longer card with supporting text below as a natural
                                        lead-in to additional content. This content is a little bit longer.
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer className="card-footer">
                                    <small className="text-muted">5 Members</small>
                                </Card.Footer>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
            
            <div className="add-button-div" onClick={() => setModalShow(true)}>
                <button id="add-button" />
            </div>

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />

        </Container>

    )
}
export default Feed;