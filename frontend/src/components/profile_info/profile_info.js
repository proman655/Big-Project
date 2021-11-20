import React from "react";
import Container from 'react-bootstrap/Container'
import Pic from '../../pictures/pic-placeholder.png'
import ChangePasswordButton from '../../pictures/change-password-button.png'
import CancelButton from "../../pictures/cancel-button.png"
import EditButton from "../../pictures/edit-profile-button.png"
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import 'bootstrap/dist/css/bootstrap.min.css';
import './profile_info.css'

function MyVerticallyCenteredModal1(props) {
    return (
        <Modal className="modal"
            {...props}
            dialogClassName="modal-70w"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton className="modal-header">
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit Profile
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body">
                <Form className="new-project-form">
                    <Form.Group className="mb-3">
                        <Form.Label >First name</Form.Label>
                        <Form.Control type="text" name="firstName"/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label >Last name</Form.Label>
                        <Form.Control type="text" name="lastName"/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label >Email</Form.Label>
                        <Form.Control type="email" name="email"/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label >Phone number</Form.Label>
                        <Form.Control type="number" name="phoneNumber"/>
                    </Form.Group>
                    <p id='editProfileStatus'></p>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <button className="create-project-button">
                    <img src={EditButton} alt="submit" id="createProjectButtonImg" />
                </button>
                <button onClick={props.onHide} className="cancel-button2">
                    <img src={CancelButton} alt="cancel" id="cancelButtonImg" />
                </button>
            </Modal.Footer>
        </Modal>
    );
}

function MyVerticallyCenteredModal2(props) {
    return (
        <Modal className="modal"
            {...props}
            dialogClassName="modal-70w"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton className="modal-header">
                <Modal.Title id="contained-modal-title-vcenter">
                    Change Password
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body">
                <Form className="chahnge-password-form">
                    <Form.Group className="mb-3">
                        <Form.Label >Current password</Form.Label>
                        <Form.Control type="password" name="oldPassword" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>New password</Form.Label>
                        <Form.Control type="password" name="newPassword" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Repeat new password</Form.Label>
                        <Form.Control type="password" name="newPassword2" />
                    </Form.Group>
                    <p id='changePasswordStatus'></p>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <button className="create-project-button">
                    <img src={ChangePasswordButton} alt="submit" id="changePasswordButtomImg" />
                </button>
                <button onClick={props.onHide} className="cancel-button2">
                    <img src={CancelButton} alt="cancel" id="cancelButtonImg" />
                </button>
            </Modal.Footer>
        </Modal>
    );
}

const ProfileInfo = () => {

    const [modalShow1, setModalShow1] = React.useState(false);
    const [modalShow2, setModalShow2] = React.useState(false);

    return (
        <Container className="profile-container">
            <Container className="profile-pic-container">
                <img src={Pic} alt="pic" className="profile-pic-img" />
            </Container>
            <Container className="profile-info-container">
                <br/>
                <h4 className="profile-label">First name</h4>
                <div className="profile-item-div"><h4 className="profile-info-text">John</h4></div>
                <h4 className="profile-label">Last name</h4>
                <div className="profile-item-div"><h4 className="profile-info-text" >Doe</h4></div>
                <h4 className="profile-label">Email</h4>
                <div className="profile-item-div"><h4 className="profile-info-text">jdoe@gmail.com</h4></div>
                <h4 className="profile-label">Phone number</h4>
                <div className="profile-item-div"><h4 className="profile-info-text">(343) 433 4312</h4></div>
                <h4 className="profile-label">Password</h4>
                <div className="profile-item-div"><h4 className="profile-info-text">**********</h4></div>
            </Container>
            <div className="edit-buttons-div">
                <button className="edit-profile-button" onClick={() => setModalShow1(true)}>
                    <img src={EditButton} id="editProfileButtonImg"></img>
                </button>
                <button className="change-password-button" onClick={() => setModalShow2(true)}>
                    <img src={ChangePasswordButton} id="changePasswordButtomImg"></img>
                </button>
            </div>

            <MyVerticallyCenteredModal1
                show={modalShow1}
                onHide={() => setModalShow1(false)}
            />

            <MyVerticallyCenteredModal2
                show={modalShow2}
                onHide={() => setModalShow2(false)}
            />

        </Container>
    )
}

export default ProfileInfo;