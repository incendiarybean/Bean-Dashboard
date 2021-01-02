import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Nav, Main, Context, Friday } from './components';
import RenderProps from './JS/props';
import connection from './JS/socket';

const io = connection();

function App() {
    let functions = RenderProps(io);
    const props = functions.props;

    return (
        <Router>
            <Context {...props} />
            <ToastContainer />
            <Nav {...props} />
            <Switch>
                <Route exact path='/stats'>
                    <Friday {...props} />
                </Route>
                <Route path='/'>
                    <Main {...props} />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;