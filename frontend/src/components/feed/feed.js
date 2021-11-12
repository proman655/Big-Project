import React from "react";
import { NavLink, Link } from 'react-router-dom'
import Placehholder from "../../pictures/card-placeholder.jpg"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import 'bootstrap/dist/css/bootstrap.min.css';
import './feed.css'


const Feed = () => {
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
            
            <div className="add-button-div">
                <button id="add-button" />
            </div>

        </Container>

    )
}
export default Feed;