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

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(getCurrentUser, [])

    function getCurrentUser() {
        setLoading(true)
        http.get('current-user').then(res => {
            console.log(res, ' current-user');
            if (res && res.data) {
                setUser(res.data)
            }
        }).catch(err => {
            if (err) {
                setUser(null)
                auth.resetToken()
            }
        }).finally(() => {
            setLoading(false)
        })
    }

    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path="/login">
                        <Login setUser={setUser}/>
                    </Route>
                    <Route path="/register">
                        <Register setUser={setUser}/>
                    </Route>
                    {!loading && <PrivateRoute path="/">
                        <Chat user={user}/>
                    </PrivateRoute>}
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
