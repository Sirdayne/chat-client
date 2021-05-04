import {useState} from 'react'
import {validateEmail} from '../services/utils';
import httpAuth from '../services/httpAuth';
import auth from '../services/auth';
import { Redirect } from "react-router-dom";

export default function Login({ setUser }) {
    const [formEmail, setFormEmail] = useState('')
    const [password, setPassword] = useState('');
    const [touched, setTouched] = useState(false);
    const [redirect, setRedirect] = useState(false);

    function login() {
        setTouched(true)
        if (isValid()) {
            const body = {
                email: formEmail, password
            }
            httpAuth.post('login', body).then(res => {
                const { token, id, email, role } = res.data
                auth.setToken(token)
                setUser({ id, email, role })
                setRedirect(true)
            })
        }
    }

    function isValid() {
        return validateEmail(formEmail)
    }

    return (
        redirect ? <Redirect to="/" push={true}/>
        : <div className="register">
            <div>
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
                </div>}

                <div className="register__btn">
                    <button className="btn"
                            onClick={(e) => login()}>LOGIN</button>
                </div>
            </div>
        </div>
    );
}
