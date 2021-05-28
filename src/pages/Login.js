import {useState} from 'react'
import {validateEmail} from '../services/utils';
import httpAuth from '../services/httpAuth';
import auth from '../services/auth';
import { Redirect, Link } from "react-router-dom";

export default function Login({ setUser }) {
    const [formEmail, setFormEmail] = useState('')
    const [password, setPassword] = useState('');
    const [touched, setTouched] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [authError, setAuthError] = useState(false);

    function login() {
        setTouched(true)
        if (isValid()) {
            const body = {
                email: formEmail, password
            }
            httpAuth.post('login', body).then(res => {
                const { token, id, email, role, color } = res.data
                auth.setToken(token)
                setUser({ id, email, role, color })
                setRedirect(true)
            }).catch(() => {
                setAuthError(true)
            })
        }
    }

    function isValid() {
        return validateEmail(formEmail)
    }

    return (
        redirect ? <Redirect to="/" push={true}/>
        : <div className="register">
            <div className="register-container">
                <div className="register-link">
                    Do not have account?
                    <Link to="/register">Sign up</Link>
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

                {touched && <div className="errors">
                    <div>{!validateEmail(formEmail) && <span>Email is not valid</span>}</div>
                    <div>{authError && <span>Wrong password or email</span>}</div>
                </div>}

                <div className="register__btn">
                    <button className="ch-btn"
                            onClick={(e) => login()}>LOGIN</button>
                </div>
            </div>
        </div>
    );
}
