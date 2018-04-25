import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getProject, getUser2, getProgress, deleteProgress, newLog, updateLog} from '../../ducks/reducer';
import Nav from '../Nav/Nav';

class Project extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            page: '',
            content: '',
            progress_id: 0,
            currContent: '',
            currTime: '',
            currName: ''
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

    updateToEdit(id, content, time, name){
        this.setState({
            page: 'edit',
            progress_id: id,
            currContent: content,
            currTime: time,
            currName: name
        })
    }

    updateLogFn(){
        this.props.updateLog(this.state.currContent, this.state.progress_id, this.props.match.params.id);
        this.setState({
            page: 'progress',
            currContent: '',
            progress_id: 0,
            currTime: '',
            currName: ''
        })
    }


    updateContent(e){
        this.setState({
            content: e
        })
    }

    newLogFn(){
        var currentDate = new Date()
        var time_stamp = (currentDate.getMonth()+1) + "/"
        + currentDate.getDate() + "/" 
        + currentDate.getFullYear() + " @ "  
        + currentDate.getHours() + ":"  
        + currentDate.getMinutes();
        this.props.newLog(this.state.content, this.props.user.id, this.props.match.params.id, time_stamp)
        this.setState({
            page: 'progress',
            content: ''
        })
    }

    updateCurrContent(e){
        this.setState({
            currContent: e
        })
    }



    render() { 
        var phases = []
        for (var i = 1; i <= this.props.project.phases; i++){
           phases.push(<div key = {i}>
               <input type = 'checkbox' />
               <label>Phase: {i}</label>
           </div>) 
        }

       var progression = this.props.progress.map( (value, i) => {
          return(
            <div key = {i}>
                <p>{value.content}</p>
                <p>{value.time_stamp}</p>
                <h6>{value.displayname}</h6>
                <button onClick = {() => this.props.deleteProgress(value.id, value.project_id)}>Delete</button>
                <button onClick = {() => this.updateToEdit(value.id, value.content, value.time_stamp, value.displayname)}>Edit Content</button>
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
            <button onClick = {() => this.setState({page: 'newlog'})}>New Entry</button>
            {progression}
        </div> : this.state.page === 'newlog' ?
        <div>
            <Nav />
            <button onClick = {() => this.updateToPhases()}>View Phases</button>
            <button onClick = {() => this.newLogFn()}>Add Entry</button>
            <label>Enter New Entry Here: </label>
            <input type = '' value = {this.state.content} onChange = {(e) => this.updateContent(e.target.value)}/>
            {progression}
        </div> : this.state.page === 'edit' ?
        <div>
            <Nav />
            <label>Enter Updated Content: </label>
            <input placeholder = {this.state.currContent} onChange = {(e) => this.updateCurrContent(e.target.value)}/>
            <p>{this.state.currTime}</p>
            <h6>{this.state.currName}</h6>
            <button onClick = {() => this.updateLogFn()}>Save</button>
            <button onClick = {() => this.updateToProgress()}>Cancel</button>
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
export default connect(mapStateToProps, {getUser2, getProject, getProgress, deleteProgress, newLog, updateLog})(Project);