import {useState} from 'react'
import {validateEmail} from '../services/utils';
import http from '../services/http';
import auth from '../services/auth';
import { Redirect } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [touched, setTouched] = useState(false);
    const [redirect, setRedirect] = useState(false);

    function login() {
        if (!isValid) {
            return
        }
        setTouched(true)
        const body = {
            email, password
        }
        http.post('login', body).then(res => {
            const { token } = res.data
            auth.setToken(token)
            setRedirect(true)
        })
    }

    function isValid() {
        return !validateEmail(email)
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

                {touched && <div className="errors">
                    <div>{!validateEmail(email) && <span>Email is not valid</span>}</div>
                </div>}

                <div className="register__btn">
                    <button className="btn"
                            onClick={(e) => login()}>LOGIN</button>
                </div>
            </div>
        </div>
    );
}
