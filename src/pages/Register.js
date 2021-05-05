import {useState} from 'react'
import {validateEmail} from "../services/utils"
import auth from "../services/auth"
import { Link, Redirect } from "react-router-dom"
import httpAuth from '../services/httpAuth'
import randomColor  from 'randomcolor'

export default function Register({ setUser }) {
    const [formEmail, setFormEmail] = useState('')
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [touched, setTouched] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const maxPasswordLength = 5;

    function register() {
        setTouched(true)
        const color = randomColor()
        if (isValid()) {
            const body = {
                email: formEmail, password, color
            }
            httpAuth.post('register', body).then(res => {
                const { token, id, email, role } = res.data
                auth.setToken(token)
                setUser({ id, email: email, role })
                setRedirect(true)
            })
        }
    }

    function isValid() {
        return validateEmail(formEmail) && password.length >= maxPasswordLength && password === confirmPassword
    }

    return (
        redirect ? <Redirect to="/" push={true}/>
        : <div className="register">
            <div className="register-container">
                <div className="register-link">
                    Already have account?
                    <Link to="/login">Sign in</Link>
                </div>

                <div className="register__label">Email</div>
                <input value={formEmail}
                       onChange={e => {setFormEmail(e.target.value)}}
                       type='email'
                />
                <div className="register__label">Password</div>
                <input value={password}
                       onChange={e => {setPassword(e.target.value)}}
                       type='password'
                />
                <div className="register__label">Confirm Password</div>
                <input value={confirmPassword}
                       onChange={e => {setConfirmPassword(e.target.value)}}
                       type='password'
                />

                {touched && <div className="errors">
                    <div>{!validateEmail(formEmail) && <span>Email is not valid</span>}</div>
                    <div>{password.length < maxPasswordLength && <span>Password length must be greater than {maxPasswordLength}</span>}</div>
                    <div>{password !== confirmPassword && <span>Passwords do not match</span>}</div>
                </div>}

                <div className="register__btn">
                    <button className="ch-btn"
                            onClick={(e) => register()}>REGISTER</button>
                </div>
            </div>
        </div>
    );
}
