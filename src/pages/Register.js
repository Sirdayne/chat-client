import {useState} from 'react'
import {validateEmail} from "../services/utils";
import auth from "../services/auth";
import { Redirect } from "react-router-dom";
import httpAuth from '../services/httpAuth';

export default function Register({ setUser }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [touched, setTouched] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const maxPasswordLength = 5;

    function register() {
        setTouched(true)
        if (isValid()) {
            const body = {
                email, password
            }
            httpAuth.post('register', body).then(res => {
                const { token } = res.data
                auth.setToken(token)
                setUser({ email})
                setRedirect(true)
            })
        }
    }

    function isValid() {
        return validateEmail(email) && password.length >= maxPasswordLength && password === confirmPassword
    }

    return (
        redirect ? <Redirect to="/" push={true}/>
        : <div className="register">
            <div>
                <div className="register__label">Email</div>
                <input value={email}
                       onChange={e => {setEmail(e.target.value)}}
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
                    <div>{!validateEmail(email) && <span>Email is not valid</span>}</div>
                    <div>{password.length < maxPasswordLength && <span>Password length must be greater than {maxPasswordLength}</span>}</div>
                    <div>{password !== confirmPassword && <span>Passwords do not match</span>}</div>
                </div>}

                <div className="register__btn">
                    <button className="btn"
                            onClick={(e) => register()}>REGISTER</button>
                </div>
            </div>
        </div>
    );
}
