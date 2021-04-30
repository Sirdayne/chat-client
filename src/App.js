import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Chat from './pages/Chat';
import auth from './services/auth';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

function App() {
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
