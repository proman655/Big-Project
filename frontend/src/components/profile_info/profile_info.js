import React from "react";
import Container from 'react-bootstrap/Container'
import Pic from '../../pictures/pic-placeholder.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import './profile_info.css'

const ProfileInfo = () => {

    return (
        <Container className="profile-container">
            <div className="profile-pic-div">
                <img src={Pic} alt="pic" className="profile-pic-img" />
            </div>
            <Container className="profile-info-container">
                <h3 className="profile-label">First name</h3>
                <div className="profile-item-div"><h3 className="profile-info-text">John</h3></div>
                <h3 className="profile-label">Last name</h3>
                <div className="profile-item-div"><h3 className="profile-info-text" >Doe</h3></div>
                <h3 className="profile-label">Email</h3>
                <div className="profile-item-div"><h3 className="profile-info-text">jdoe@gmail.com</h3></div>
                <h3 className="profile-label">Phone number</h3>
                <div className="profile-item-div"><h3 className="profile-info-text">(343) 433 4312</h3></div>
            </Container>
        </Container>
    )
}

export default ProfileInfo;