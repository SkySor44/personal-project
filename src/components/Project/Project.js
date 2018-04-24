import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getProject, getUser2} from '../../ducks/reducer';
import Nav from '../Nav/Nav';

class Project extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            
         }
    }

    componentDidMount(){
        this.props.getUser2();
        this.props.getProject(this.props.match.params.id, this.props.user.id)
    }

    render() { 
        var phases = []
        for (var i = 1; i <= this.props.project.phases; i++){
           phases.push(<p key = {i}>Phase: {i}</p>) 
        }
        var percentage = this.props.project.percentdone * 100
        return ( 
            <div>
                <Nav />
                <h1>{percentage}%</h1>
               <h1>{this.props.project.name}</h1>
               <h2>{this.props.project.location}</h2>
               {phases}
            </div>
         )
    }
}
 

function mapStateToProps(state){
    return {
        project: state.project,
        user: state.user
    }
}
export default connect(mapStateToProps, {getUser2, getProject})(Project);