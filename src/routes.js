import React from 'react';
import {HashRouter, Switch, Route} from 'react-router-dom';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Projects from './components/Projects/Projects';
import Project from './components/Project/Project';
import Employees from './components/Employees/Employees';
import Employee from './components/Employee/Employee';
import CreateUser from './components/CreateUser/CreateUser';

export default (
    <HashRouter>
        <Switch>

            <Route path = '/' component = {Login} exact/>
            <Route path = '/home' component = {Home} />
            <Route path = '/projects' component = {Projects} />
            <Route path = '/project/:id' component = {Project} />
            <Route path = '/employees' component = {Employees} />
            <Route path = '/employee/:id' component = {Employee} />
            <Route path = '/createuser' component = {CreateUser} />

        </Switch>
    </HashRouter>
)


