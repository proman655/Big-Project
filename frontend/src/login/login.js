import React from 'react';
import Logo from '../pictures/logo-title-nobg.png'
import LoginButton from '../pictures/login-button.png'
import RegisterButton from '../pictures/register-button.png'
import './login.css'

class Login extends React.Component {

    state = {
        email:'',
        password:''
    }

    handleChange = (e) => {
        const {name, value} = e.target
        this.setState({[name]:value})
    }

    handleSubmit = (e) => {
        e.preventDefault()
    }

    render(){
        return(
            <div className='div-login'>
                <div className='div-login-logo'>
                    <img src={Logo} alt='logo' className='logo-img'/>
                </div>
                <div className='div-form'>
                    <form onSubmit> 
                        <div className='form-group'>
                            <input type='email' name='email' placeholder='Email' required onChange={this.handleChange}></input>
                        </div>
                        <div className='form-group'>
                            <input type='password' name='password' placeholder='Password' required onChange={this.handleChange}></input>
                        </div>
                        <button onSubmit={this.handleSubmit}>
                            <img src={LoginButton} alt='login' className='login-button'/>
                        </button>
                        <div className='new-user-div'>
                            <p>New User?</p>
                        </div>
                        <button>
                            <img src={RegisterButton} alt='register' className='register-button' />
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login;