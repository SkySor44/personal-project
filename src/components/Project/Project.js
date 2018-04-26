import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getProject, getUser2, getProgress, deleteProgress, newLog, updateLog, getPhases, toggleDropdown, toggleDone, updatePhase} from '../../ducks/reducer';
import Nav from '../Nav/Nav';
import './Project.css'

class Project extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            page: 'phases',
            content: '',
            progress_id: 0,
            currContent: '',
            currTime: '',
            currName: '',
            currPhaseName: '',
            currPhaseDesc: '',
            currPhaseDueDate: '',
            currPhaseId: 0
         }
    }

    componentDidMount(){
        this.props.getUser2();
        this.props.getProject(this.props.match.params.id, this.props.user.id);
        this.props.getProgress(this.props.match.params.id);
        this.props.getPhases(this.props.match.params.id)
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

    updateToPhaseUpdate(phase_name, due_date, description, phase_id){
        this.setState({
            page: 'update_phase',
            currPhaseName: phase_name,
            currPhaseDueDate: due_date,
            currPhaseDesc: description,
            currPhaseId: phase_id
        })
    }

    updateCurrPhaseName(e){
        this.setState({
            currPhaseName: e
        })
    }

    updateCurrPhaseDueDate(e){
        this.setState({
            currPhaseDueDate: e
        })
    }

    updateCurrPhaseDesc(e){
        this.setState({
            currPhaseDesc: e
        })
    }

    updatePhaseFn(){
        const {currPhaseName, currPhaseDueDate, currPhaseDesc, currPhaseId} = this.state;
        const {id} = this.props.match.params
        this.props.updatePhase(currPhaseName, currPhaseDueDate, currPhaseDesc, currPhaseId, id);
        this.setState({
            page: 'phases',
            currPhaseName: '',
            currPhaseDueDate: '',
            currPhaseDesc: '',
            currPhaseId: 0
        })
    }



    render() { 
                                        //================//
                                        //=====PHASES=====/ 
                                        //================//
        
        var phases = this.props.phases.map((value, i) => {
        return(

                                //EMPLOYEE: SHOW DROPDOWN BUT NOT FINISHED PHASE//

            value.show_dropdown && value.done === false  && this.props.user.role === 'employee'? <div className = 'phase-not-done phase-dropdown' key = {i}>
            <label>{i +1}.{value.phase_name}</label>
            <p>Due: {value.due_date}</p>
            <button onClick = {() => this.props.toggleDropdown(value.id, this.props.match.params.id)}>Dropdown Toggle</button>
            <button onClick = {() => this.props.toggleDone(value.id, this.props.match.params.id)}>Mark as complete</button>
            <label>Assigned To Phase: {value.displayname}</label>
            <label>With: {value.company}</label>
            <p>Description: {value.description}</p>
       </div> 

                                //EMPLOYEE: SHOW DROPDOWN AND FINSIHED PHASE//

       : value.show_dropdown && value.done  && this.props.user.role === 'employee' ? <div className = 'phase-done phase-dropdown' key = {i}>
            <label>{i +1}.{value.phase_name}</label>
            <p>Due: {value.due_date}</p>
            <button onClick = {() => this.props.toggleDropdown(value.id, this.props.match.params.id)}>Dropdown Toggle</button>
            <button onClick = {() => this.props.toggleDone(value.id, this.props.match.params.id)}>Mark as Incomplete</button>
            <label>Assigned To Phase: {value.displayname}</label>
            <label>With: {value.company}</label>
            <p>Description: {value.description}</p>
       </div>

                                //EMPLOYEE: NOT SHOWING DROPDOWN AND NOT FINISHED PHASE//

       : value.show_dropdown === false && value.done === false  && this.props.user.role === 'employee'?
       <div className = 'phase-not-done phase-no-dropdown' key = {i}>
            <label>{i +1}.{value.phase_name}</label>
            <p>Due: {value.due_date}</p>
            <button onClick = {() => this.props.toggleDropdown(value.id, this.props.match.params.id)}>Dropdown Toggle</button>
            <button onClick = {() => this.props.toggleDone(value.id, this.props.match.params.id)}>Mark as complete</button>
       </div>
       
                                //EMPLOYEE: NOT SHOWING DROPDOWN AND FINISHED PHASE//

       : value.show_dropdown === false && value.done === true && this.props.user.role === 'employee' ?
       <div className = 'phase-done  phase-no-dropdown' key = {i}>
            <label>{i +1}.{value.phase_name}</label>
            <p>Due: {value.due_date}</p>
            <button onClick = {() => this.props.toggleDropdown(value.id, this.props.match.params.id)}>Dropdown Toggle</button>
            <button onClick = {() => this.props.toggleDone(value.id, this.props.match.params.id)}>Mark as Incomplete</button>
        </div> 
        :                          //ADMIN: SHOW DROPDOWN BUT NOT FINISHED PHASE//

        value.show_dropdown && value.done === false && this.props.user.role === 'admin' ? 
    <div className = 'phase-not-done phase-dropdown' key = {i}>
        <label>{i +1}.{value.phase_name}</label>
        <p>Due: {value.due_date}</p>
        <button onClick = {() => this.props.toggleDropdown(value.id, this.props.match.params.id)}>Dropdown Toggle</button>
        <button onClick = {() => this.props.toggleDone(value.id, this.props.match.params.id)}>Mark as complete</button>
        <label>Assigned To Phase: {value.displayname}</label>
        <label>With: {value.company}</label>
        <p>Description: {value.description}</p>
        <button onClick = {() => this.updateToPhaseUpdate(value.phase_name, value.due_date, value.description, value.id)}>Update Phase</button>
   </div> 

                            //ADMIN: SHOW DROPDOWN AND FINSIHED PHASE//

   : value.show_dropdown && value.done && this.props.user.role === 'admin' ? 
   <div className = 'phase-done phase-dropdown' key = {i}>
        <label>{i +1}.{value.phase_name} </label>
        <p>Due: {value.due_date} </p>
        <button onClick = {() => this.props.toggleDropdown(value.id, this.props.match.params.id)}>Dropdown Toggle</button>
        <button onClick = {() => this.props.toggleDone(value.id, this.props.match.params.id)}>Mark as Incomplete</button>
        <label>Assigned To Phase: {value.displayname ? value.displayname : <button>Go To Employees To Assign</button>} </label>
        <label>With: {value.company} </label>
        <p>Description: {value.description}</p>
    
   </div>

                            //ADMIN: NOT SHOWING DROPDOWN AND NOT FINISHED PHASE//

   : value.show_dropdown === false && value.done === false && this.props.user.role === 'admin' ?
   <div className = 'phase-not-done phase-no-dropdown' key = {i}>
        <label>{i +1}.{value.phase_name}</label>
        <p>Due: {value.due_date}</p>
        <button onClick = {() => this.props.toggleDropdown(value.id, this.props.match.params.id)}>Dropdown Toggle</button>
        <button onClick = {() => this.props.toggleDone(value.id, this.props.match.params.id)}>Mark as complete</button>
   </div>
   
                            //ADMIN: NOT SHOWING DROPDOWN AND FINISHED PHASE//

   : value.show_dropdown === false && value.done === true && this.props.user.role === 'admin' ?
   <div className = 'phase-done  phase-no-dropdown' key = {i}>
        <label>{i +1}.{value.phase_name}</label>
        <p>Due: {value.due_date}</p>
        <button onClick = {() => this.props.toggleDropdown(value.id, this.props.match.params.id)}>Dropdown Toggle</button>
        <button onClick = {() => this.props.toggleDone(value.id, this.props.match.params.id)}>Mark as Incomplete</button>
    </div> : null
        )   
        })

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

        var renders = this.state.page === 'phases' && this.props.user.role === 'employee'? 
        <div>
            <Nav />
            <button onClick = {() => this.updateToProgress()}>View/Update Progress</button>
            <h1>{percentage}%</h1>
            <h1>{this.props.project.name}</h1>
            <h2>{this.props.project.location}</h2>
            {phases}
        </div> : this.state.page === 'phases' && this.props.user.role === 'admin'? 
        <div>
            <Nav />
            <button onClick = {() => this.updateToProgress()}>View/Update Progress</button>
            <h1>{percentage}%</h1>
            <h1>{this.props.project.name}</h1>
            <h2>{this.props.project.location}</h2>
            <button>Add Phase</button>
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
        </div> 
        
        : this.state.page === 'update_phase' ?
        <div>
            <Nav />
            <label>Enter New Phase Name: </label>
            <input type = 'text' placeholder = {this.state.currPhaseName} onChange = {(e) => this.updateCurrPhaseName(e.target.value)}/> 
            <label>Enter New Due Date (yyyy-mm-dd): </label>
            <input type = 'text' placeholder = 'yyyy-mm-dd' onChange = {(e) => this.updateCurrPhaseDueDate(e.target.value)}/>
            <label>Enter New Description: </label>
            <input type = 'text' placeholder = {this.state.currPhaseDesc} onChange = {(e) => this.updateCurrPhaseDesc(e.target.value)}/>
            <button onClick = {() =>  this.updateToPhases()}>Cancel</button>
            <button onClick = {() => this.updatePhaseFn()}>Save</button>
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
        progress: state.progress,
        phases: state.phases
    }
}
export default connect(mapStateToProps, {getUser2, getProject, getProgress, deleteProgress, newLog, updateLog, getPhases, toggleDropdown, toggleDone, updatePhase})(Project);