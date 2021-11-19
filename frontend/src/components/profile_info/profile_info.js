import React from "react";
import Container from 'react-bootstrap/Container'
import Pic from '../../pictures/pic-placeholder.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import './profile_info.css'

const ProfileInfo = () => {

    <Container className="div-profile">
        <Container className="profile-pic">
            <img src={Pic} alt="pic" className="profile-pic-img" />
        </Container>
        <Container className="profile-info-div">
            <h3 className="v">First name</h3>
            <h3 className="profile-info-text">John</h3>
            <h3 className="profile-label">Last name</h3>
            <h3 className="profile-info-text" >Doe</h3>
            <h3 className="profile-label">Email</h3>
            <h3 className="profile-info-text">jdoe@gmail.com</h3>
            <h3 className="profile-label">Phone number</h3>
            <h3 className="profile-info-text">(343) 433 4312</h3>
        </Container>
    </Container>
    
}

export default ProfileInfo;