import React, { Component } from 'react';
import Nav from '../Nav/Nav';
import {connect} from 'react-redux';
import {getEmployeeProjects, getEmployee, getProjects, getPhases, assignProject, assignPhase} from '../../ducks/reducer';
import './Employee.css';

class Employee extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            page: 'profile',
            phases: []
         }
    }

    componentDidMount(){
        this.props.getEmployeeProjects(this.props.match.params.id)
        this.props.getEmployee(this.props.match.params.id)
        this.props.getProjects()
    }

    startAssignment(){
        this.setState({
            page: 'projects'
        })
    }

    selectProject(id){
        this.props.getPhases(id);
        this.props.assignProject(this.props.match.params.id, id)
        this.setState({
            page: 'phases',
            phases: this.props.phases
        })
    }

    assignPhase(id){
        this.props.assignPhase(this.props.match.params.id, id)
        this.setState({
            page: 'profile',
            phases: []
        })
    }

    render() { 

        var phases = this.props.phases.map( (value, i) => {
            return (
                value.done ?
                <div key = {i} className = 'employee-contain phases-contain'>
                    <h2>{value.phase_name}</h2>
                    <h3>Due: {value.due_date}</h3>
                    <h3>Status: Complete</h3>
                    <p>Description: {value.description}</p>
                    <button className = 'two-btns' onClick = {() => this.assignPhase(value.id)}>Assign</button>
                </div> : 
                <div key = {i} className = 'employee-contain phases-contain'>
                    <h2>{value.phase_name}</h2>
                    <h3>Due: {value.due_date}</h3>
                    <h3>Status: Incomplete</h3>
                    <p>Description: {value.description}</p>
                    <button className = 'two-btns' onClick = {() => this.assignPhase(value.id)}>Assign</button>
                </div>
            )
        })

        var projects = this.props.projects.map( (value, i) => {
            return (
                <div key = {i} className = 'projects-contain'>
                    <h2>{value.name}</h2>
                    <h3>{value.location}</h3>
                    <button className = 'two-btns' onClick = {() => this.selectProject(value.project_id)}>Select</button>
                </div>
            )
        })

        var renders = this.props.employee_projects.map( (value, i) => {
           return (
        <div key = {i}>
            <h2 className = 'white'>{value.name}</h2>
            <p className = 'gray'>{value.location}</p>
        </div>
           ) 
        })

        var page = this.state.page === 'profile' ? 
        <div>
            <Nav />
            <div className = 'employee-contain'>
                <h1>{this.props.employee.displayname}</h1>
                <h3>{this.props.employee.company}</h3>
                <h4>ID: {this.props.employee.id}</h4>
                <button className = 'two-btns' onClick = {() => this.startAssignment()}>Assign Work</button>
                <h2 className = 'yellow' >Current Projects: </h2>
                {renders}
            </div>
                
        </div> 
        : this.state.page === 'projects' ?
        <div className = 'employee-contain'>
            <h1 className = 'projects-head'>Select Project To Assign:</h1>
            {projects}
        </div> 
        : this.state.page === 'phases' ?
        <div className = 'employee-contain'>
            <h1 className = 'phase-head' >Select a Phase:</h1>
            {phases}
        </div> : null
        return ( 
            <div>
                {page}
            </div>
         )
    }
}
 

function mapStateToProps(state){
    return {
        user: state.user,
        projects: state.projects,
        employee: state.employee,
        employee_projects: state.employee_projects,
        phases: state.phases
    }
}
export default connect(mapStateToProps, {getEmployeeProjects, getEmployee, getProjects, getPhases, assignProject, assignPhase})(Employee);