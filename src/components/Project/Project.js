import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getProject, getUser2, getProgress, deleteProgress} from '../../ducks/reducer';
import Nav from '../Nav/Nav';

class Project extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            page: ''
         }
    }

    componentDidMount(){
        this.props.getUser2();
        this.props.getProject(this.props.match.params.id, this.props.user.id);
        this.props.getProgress(this.props.match.params.id)
    }

    updateToPhases(){
        this.setState({
            page: 'phases'
        })
    }

    updateToProgress(){
        this.setState({
            page: 'progress'
        })
    }



    render() { 
        var phases = []
        for (var i = 1; i <= this.props.project.phases; i++){
           phases.push(<p key = {i}>Phase: {i}</p>) 
        }

       var progression = this.props.progress.map( (value, i) => {
          return(
            <div key = {i}>
                <p>{value.content}</p>
                <h6>{value.displayname}</h6>
                <button onClick = {() => this.props.deleteProgress(value.id, value.project_id)}>Delete</button>
            </div>
          ) 
       })
        var percentage = this.props.project.percentdone * 100;

        var renders = this.state.page === '' || this.state.page === 'phases' ? 
        <div>
            <Nav />
            <button onClick = {() => this.updateToProgress()}>View/Update Progress</button>
            <h1>{percentage}%</h1>
            <h1>{this.props.project.name}</h1>
            <h2>{this.props.project.location}</h2>
            {phases}
        </div> : 
        this.state.page === 'progress' ?
        <div>
            <Nav />
            <button onClick = {() => this.updateToPhases()}>View Phases</button>
            {progression}
        </div> : null

        return ( 
            <div>
                {renders}
            </div>
         )
    }
}
 

function mapStateToProps(state){
    return {
        project: state.project,
        user: state.user,
        progress: state.progress
    }
}
export default connect(mapStateToProps, {getUser2, getProject, getProgress, deleteProgress})(Project);