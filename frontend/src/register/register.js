import React from 'react';
import Logo from '../pictures/logo-register.png'
import RegisterButton from '../pictures/register-button.png'
import CancelButton from '../pictures/cancel-button.png'
import { Link } from 'react-router-dom';
import './register.css'

class Register extends React.Component {

    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordRepeat: ''
    }

    handleChange = (e) => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    handleSubmit = (e) => {
        e.preventDefault()
    }

    render() {
        return (
            <div className='div-register'>
                <div className='div-register-logo'>
                    <img src={Logo} alt='logo' className='logo-img'/>
                </div>
                <div className='div-register-form'>
                    <form onSubmit>
                        <div className='form-group'>
                            <input type='text' name='firstName' placeholder='First name' required onChange={this.handleChange}></input>
                        </div>
                        <div className='form-group'>
                            <input type='text' name='lastName' placeholder='Last name' required onChange={this.handleChange}></input>
                        </div>
                        <div className='form-group'>
                            <input type='email' name='email' placeholder='Email' required onChange={this.handleChange}></input>
                        </div>
                        <div className='form-group'>
                            <input type='password' name='password' placeholder='Password' required onChange={this.handleChange}></input>
                        </div>
                        <div className='form-group'>
                            <input type='password' name='passwordRepeat' placeholder='Repeat password' required onChange={this.handleChange}></input>
                        </div>
                        <div className='buttons-div'>
                            <Link to='/'>
                                <button renderAs='button' className='cancel-button'>
                                    <img src={CancelButton} alt='cancel' className='register-button' />
                                </button>
                            </Link>
                            <button onSubmit={this.handleSubmit} className='register-button'>
                                <img src={RegisterButton} alt='register' className='register-button' />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Register;