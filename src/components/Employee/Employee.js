import React, { Component } from 'react';
import Nav from '../Nav/Nav';
import {connect} from 'react-redux';
import {getEmployeeProjects, getEmployee, getProjects, getPhases, assignProject, assignPhase} from '../../ducks/reducer';

class Employee extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            page: 'profile',
            phases: [],
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
                <div key = {i}>
                    <h2>{value.phase_name}</h2>
                    <h3>{value.due_date}</h3>
                    <h3>Status: Complete</h3>
                    <p>{value.description}</p>
                    <button onClick = {() => this.assignPhase(value.id)}>Assign</button>
                </div> : 
                <div key = {i}>
                    <h2>{value.phase_name}</h2>
                    <h3>{value.due_date}</h3>
                    <h3>Status: Incomplete</h3>
                    <p>{value.description}</p>
                    <button>Assign</button>
                </div>
            )
        })

        var projects = this.props.projects.map( (value, i) => {
            return (
                <div key = {i}>
                    <h2>{value.name}</h2>
                    <h3>{value.location}</h3>
                    <button onClick = {() => this.selectProject(value.project_id)}>Select</button>
                </div>
            )
        })

        var renders = this.props.employee_projects.map( (value, i) => {
           return (
        <div key = {i}>
            <h2>{value.name}</h2>
            <p>{value.location}</p>
        </div>
           ) 
        })

        var page = this.state.page === 'profile' ? 
        <div>
            <Nav />
                <h1>{this.props.employee.displayname}</h1>
                <h3>{this.props.employee.company}</h3>
                <h4>ID: {this.props.employee.id}</h4>
                <button onClick = {() => this.startAssignment()}>Assign Work</button>
                {renders}
        </div> 
        : this.state.page === 'projects' ?
        <div>
            <h1>Select A Project To Assign Employee To</h1>
            {projects}
        </div> 
        : this.state.page === 'phases' ?
        <div>
            <h1>Select a Phase</h1>
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