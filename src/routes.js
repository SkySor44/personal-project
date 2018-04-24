import React from 'react';
import {HashRouter, Switch, Route} from 'react-router-dom';
import Login from './components/Login/Login';
import Projects from './components/Projects/Projects';
import Project from './components/Project/Project';
import Employees from './components/Employees/Employees';
import Employee from './components/Employee/Employee';
import CreateUser from './components/CreateUser/CreateUser';
import AdminHome from './components/Home/AdminHome';
import EmployeeHome from './components/Home/EmployeeHome';
import Loading from './components/Loading/Loading';

export default (
    <HashRouter>
        <Switch>

            <Route path = '/' component = {Login} exact/>
            <Route path = '/projects' component = {Projects} />
            <Route path = '/project/:id' component = {Project} />
            <Route path = '/employees' component = {Employees} />
            <Route path = '/employee/:id' component = {Employee} />
            <Route path = '/createuser' component = {CreateUser} />
            <Route path = '/home/admin' component = {AdminHome} />
            <Route path = '/home/employee' component = {EmployeeHome} />
            <Route path = '/loading' component = {Loading} />

        </Switch>
    </HashRouter>
)


