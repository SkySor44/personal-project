import React, { Component } from 'react';
import Nav from '../Nav/Nav';
import {connect} from 'react-redux';
import {getProjects, getUser2, addProject} from '../../ducks/reducer';
import {Link} from 'react-router-dom';
import home from './Home-yello.png';
import './Projects.css';
import {Parallax} from 'react-parallax';
import image from './blueprints.jpeg';


class Projects extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            page: 'home',
            name: '',
            location: ''
         }
    }

    componentDidMount(){
        this.props.getProjects();
        this.props.getUser2();
    }

    updateToNewProject(){
        this.setState({
            page: 'new-project'
        })
    }

    updateToHome(){
        this.setState({
            page: 'home'
        })
    }

    myAddProject(){
        this.props.addProject(this.props.user.id, this.state.name, this.state.location);
        this.setState({
            page: 'home',
            name: '',
            location: ''
        })

        this.componentDidMount();
    }

    updateName(e){
        this.setState({
            name: e
        })
    }

    updateLocation(e){
        this.setState({
            location: e
        })
    }

    render() { 
        var mappedProjects = this.props.projects.map((project, i) => {
           return(
            <div key = {i} className = 'project-contain'>
                <img className = 'home-icon' src = {home} alt = 'home'/>
                <div className = 'project-info'>
                    <Link className = 'project-link' to = {`/project/${project.project_id}`}><h1>{project.name}</h1></Link>
                    <label className = 'location'>Location: </label>
                    <h2 className = 'location'>{project.location}</h2>
                    {this.props.user.role === 'admin' ? <h2 className = 'location'>ID: {project.project_id}</h2>: null}
                </div>
            </div>
           ) 
        })
            
        var renders = this.state.page === 'home' ?
            <div className = 'projects-wrap'>
                <Nav />
                <div className = 'projects-header'>
                    <Parallax className = 'parallax-proj' bgImage = {image} strength = {500} bgImageSize = {"cover"}><div>
                        <h1>Current Projects:</h1>
                    </div></Parallax>
                </div>
                
                {this.props.user.role === 'admin' ? <div className = 'add-project-btn'><button className = 'two-btns' onClick = {() => this.updateToNewProject()}>Add Project</button></div>: null}
                <div className = 'projects-only'>
                    {mappedProjects}
                </div>
        
            </div> : this.state.page === 'new-project' ?
            <div>
                <Nav />
                <div className = 'log-back'>
                    <button className = 'two-btns' onClick = {() => this.updateToHome()}>Back</button>
                    <p>Back</p>
                </div>
                <h1 className = 'new-proj-head'>Create New Project:</h1>
                <div className = 'new-proj-contain'>
                    <div className = 'input-class'>
                        <label>Project Name: </label>
                        <input onChange = {(e) => this.updateName(e.target.value)} type = 'text'/> 
                    </div>
                    <div className = 'input-class'>
                        <label>Location: </label>
                        <input onChange = {(e) => this.updateLocation(e.target.value)} type = 'text'/> 
                    </div>
                    <button className = 'two-btns' onClick = {() => this.myAddProject()}>Add Project</button>
                    
                </div>
                
            </div> : null
                
        return ( 
            <div className = 'projects-page-contain'>
                {renders}
            </div>
         )
    }
}
 

function mapStateToProps(state){
    return {
        projects: state.projects,
        user: state.user
    }
}
export default connect(mapStateToProps, {getProjects, getUser2, addProject})(Projects);