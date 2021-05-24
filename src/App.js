import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Nav, Main, Context, Friday, Sandstorm, Login } from './components';
import RenderProps from './JS/props';
import socket from './JS/socket';

function App() {
    let functions = RenderProps(socket);
    const props = functions.props;

    return (
        <Router>
            <Context {...props} />
            <ToastContainer />
            <Nav {...props} />
                {
                    props.Authed ?
                    <Switch>
                        <Route exact path='/stats'>
                            <Friday {...props} />
                        </Route>
                        <Route exact path='/sandstorm'>
                            <Sandstorm {...props} />
                        </Route>
                        <Route path='/'>
                            <Main {...props} />
                        </Route>
                    </Switch>
                    :
                    <Switch>
                        <Route path='/'>
                            <Login {...props} />
                        </Route>
                    </Switch>
                }
        </Router>
    );

}

export default App;