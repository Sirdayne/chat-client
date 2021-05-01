import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Chat from './pages/Chat';
import auth from './services/auth';
import http from './services/http';
import {useState, useEffect} from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

function App() {

    const [redirect, setRedirect] = useState(false);

    useEffect(getCurrentUser, [])

    function getCurrentUser() {
        http.get('current-user').then(res => {
            console.log(res, ' current-user');
        }).catch(err => {
            if (err) {
                auth.resetToken()
                setRedirect(true)
            }
        })
    }

    function renderRedirect() {
        setRedirect(false)
        return <Redirect to="/login" push={true}/>
    }

    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path="/login">
                        <Login/>
                    </Route>
                    <Route path="/register">
                        <Register/>
                    </Route>
                    <PrivateRoute path="/">
                        <Chat/>
                    </PrivateRoute>
                    { redirect && renderRedirect() }
                </Switch>
            </Router>
        </div>
    );
}

function PrivateRoute({ component: Component, ...rest }) {
    if (!auth.isLoggedIn()) {
        return <Redirect to="/login" push={true}/>
    }

    return (
        <Route
            {...rest}
            render={props => <Component {...props} />}
        />
    );
}

export default App;
