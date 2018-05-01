import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getProject, getUser2, getProgress, deleteProgress, newLog, updateLog, getPhases, toggleDropdown, toggleDone, updatePhase, createPhase, deletePhase} from '../../ducks/reducer';
import Nav from '../Nav/Nav';
import './Project.css';
import FillHouse from './FillHouse';
import {Link} from 'react-router-dom';
import IoAndroidCheckboxOutline from 'react-icons/lib/io/android-checkbox-outline';
import FaCaretSquareODown from 'react-icons/lib/fa/caret-square-o-down';
import FaEdit from 'react-icons/lib/fa/edit';
import FaTrashO from 'react-icons/lib/fa/trash-o'

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
            currPhaseId: 0,
            newPhaseName: '',
            newPhaseDueDate: '',
            newPhaseDesc: ''
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

    updateToCreatePhase(){
        this.setState({
            page: 'create_phase'
        })
    }

    updateNewPhaseName(e){
        this.setState({
            newPhaseName: e
        })
    }

    updateNewPhaseDesc(e){
        this.setState({
            newPhaseDesc: e
        })
    }

    updateNewPhaseDueDate(e){
        this.setState({
            newPhaseDueDate: e
        })
    }

    createPhaseFn(){
        const {newPhaseName, newPhaseDesc, newPhaseDueDate} = this.state;
        const {id} = this.props.match.params;
        this.props.createPhase(id, newPhaseName, newPhaseDueDate, newPhaseDesc)
        this.setState({
            page: 'phases',
            newPhaseName: '',
            newPhaseDesc: '',
            newPhaseDueDate: ''
        })
    }


    render() { 
                                        //================//
                                        //=====PHASES=====/ 
                                        //================//
        var phases = this.props.phases.map((value, i) => {
        return (

                                //EMPLOYEE: SHOW DROPDOWN BUT NOT FINISHED PHASE//

            value.show_dropdown && value.done === false  && this.props.user.role === 'employee'? <div className = 'phase-not-done phase-dropdown' key = {i}>
            <div className = 'check-div'>
                <label>{i +1}.{value.phase_name}</label>
                <div>
                    <button onClick = {() => this.props.toggleDone(value.id, this.props.match.params.id)}><IoAndroidCheckboxOutline className = 'check'/></button>
                    <button onClick = {() => this.props.toggleDropdown(value.id, this.props.match.params.id)}><FaCaretSquareODown className = 'dropdown-open'/></button>
                </div>
            </div>
            <p>Due: {value.due_date}</p>
            <label>Assigned To Phase: {value.assigned_employee_id !== 17 ? value.displayname : <p>No Assignment Made</p>}</label>
            <label>{value.assigned_employee_id !== 17 ? <p>With: {value.company}</p> : <p></p>}</label>
            <p>Description: {value.description}</p>
       </div> 

                                //EMPLOYEE: SHOW DROPDOWN AND FINSIHED PHASE//

       : value.show_dropdown && value.done  && this.props.user.role === 'employee' ? <div className = 'phase-done phase-dropdown' key = {i}>
            <div className = 'check-div'>
                <label>{i +1}.{value.phase_name}</label>
                <div>
                    <button onClick = {() => this.props.toggleDone(value.id, this.props.match.params.id)}><IoAndroidCheckboxOutline className = 'check-done'/></button>
                    <button onClick = {() => this.props.toggleDropdown(value.id, this.props.match.params.id)}><FaCaretSquareODown className = 'dropdown-open'/></button>
                </div>
            </div>
            <p>Due: {value.due_date}</p>
            <label>Assigned To Phase: {value.assigned_employee_id !== 17 ? value.displayname : <p>No Assignment Made</p>}</label>
            <label>{value.assigned_employee_id !== 17 ? <p>With: {value.company}</p> : <p></p>}</label>
            <p>Description: {value.description}</p>
       </div>

                                //EMPLOYEE: NOT SHOWING DROPDOWN AND NOT FINISHED PHASE//

       : value.show_dropdown === false && value.done === false  && this.props.user.role === 'employee'?
       <div className = 'phase-not-done phase-no-dropdown' key = {i}>
            <div className = 'check-div'>
                <label>{i +1}.{value.phase_name}</label>
                <div>
                    <button onClick = {() => this.props.toggleDone(value.id, this.props.match.params.id)}><IoAndroidCheckboxOutline className = 'check'/></button>
                    <button onClick = {() => this.props.toggleDropdown(value.id, this.props.match.params.id)}><FaCaretSquareODown className = 'dropdown'/></button>
                </div>
            </div>
           
            <p>Due: {value.due_date}</p>            
       </div>
       
                                //EMPLOYEE: NOT SHOWING DROPDOWN AND FINISHED PHASE//

       : value.show_dropdown === false && value.done === true && this.props.user.role === 'employee' ?
       <div className = 'phase-done  phase-no-dropdown' key = {i}>
            <div className = 'check-div'>
                <label>{i +1}.{value.phase_name}</label>
                <div>
                    <button onClick = {() => this.props.toggleDone(value.id, this.props.match.params.id)}><IoAndroidCheckboxOutline className = 'check-done'/></button>
                    <button onClick = {() => this.props.toggleDropdown(value.id, this.props.match.params.id)}><FaCaretSquareODown className = 'dropdown'/></button>
                </div>
            </div>
            <p>Due: {value.due_date}</p>
        </div> 
        :                          //ADMIN: SHOW DROPDOWN BUT NOT FINISHED PHASE//

        value.show_dropdown && value.done === false && this.props.user.role === 'admin' ? 
    <div className = 'phase-not-done phase-dropdown' key = {i}>
        <div className = 'check-div'>
            <label>{i +1}.{value.phase_name}</label>
            <div>
                <button onClick = {() => this.props.toggleDone(value.id, this.props.match.params.id)}><IoAndroidCheckboxOutline className = 'check'/></button>
                <button onClick = {() => this.props.toggleDropdown(value.id, this.props.match.params.id)}><FaCaretSquareODown className = 'dropdown-open'/></button>
            </div>
        </div>
        <p>Due: {value.due_date}</p>
        <label>Assigned To Phase: {value.assigned_employee_id !== 17 ? value.displayname : <button>Go To Employees To Assign</button>}</label>
        <label>{value.assigned_employee_id !== 17 ? <p>With: {value.company}</p> : <p></p>}</label>
        <p>Description: {value.description}</p>
        <button onClick = {() => this.updateToPhaseUpdate(value.phase_name, value.due_date, value.description, value.id)}><FaEdit className = 'edit-btn'/></button>
        <button onClick = {() => this.props.deletePhase(value.id, this.props.match.params.id)}><FaTrashO className = 'trash'/></button>
   </div> 

                            //ADMIN: SHOW DROPDOWN AND FINSIHED PHASE//

   : value.show_dropdown && value.done && this.props.user.role === 'admin' ? 
   <div className = 'phase-done phase-dropdown' key = {i}>
        <div className = 'check-div'>
                <label>{i +1}.{value.phase_name}</label>
                <div>
                    <button onClick = {() => this.props.toggleDone(value.id, this.props.match.params.id)}><IoAndroidCheckboxOutline className = 'check-done'/></button>
                    <button onClick = {() => this.props.toggleDropdown(value.id, this.props.match.params.id)}><FaCaretSquareODown className = 'dropdown-open'/></button>
                </div>
            </div>
        <p>Due: {value.due_date} </p>
        <label>Assigned To Phase: {value.assigned_employee_id !== 17 ? value.displayname : <button>Go To Employees To Assign</button>} </label>
        <label>{value.assigned_employee_id !== 17 ? <p>With: {value.company}</p> : <p></p>}</label>
        <p>Description: {value.description}</p>
        <button onClick = {() => this.props.deletePhase(value.id, this.props.match.params.id)}><FaTrashO className = 'trash' /></button>
   </div>

                            //ADMIN: NOT SHOWING DROPDOWN AND NOT FINISHED PHASE//

   : value.show_dropdown === false && value.done === false && this.props.user.role === 'admin' ?
   <div className = 'phase-not-done phase-no-dropdown' key = {i}>
        <div className = 'check-div'>
            <label>{i +1}.{value.phase_name}</label>
            <div>
                <button onClick = {() => this.props.toggleDone(value.id, this.props.match.params.id)}><IoAndroidCheckboxOutline className = 'check'/></button>
                <button onClick = {() => this.props.toggleDropdown(value.id, this.props.match.params.id)}><FaCaretSquareODown className = 'dropdown'/></button>
            </div>
        </div>
        <p>Due: {value.due_date}</p>
   </div>
   
                            //ADMIN: NOT SHOWING DROPDOWN AND FINISHED PHASE//

   : value.show_dropdown === false && value.done === true && this.props.user.role === 'admin' ?
   <div className = 'phase-done  phase-no-dropdown' key = {i}>
       <div className = 'check-div'>
                <label>{i +1}.{value.phase_name}</label>
                <div>
                    <button onClick = {() => this.props.toggleDone(value.id, this.props.match.params.id)}><IoAndroidCheckboxOutline className = 'check-done'/></button>
                    <button onClick = {() => this.props.toggleDropdown(value.id, this.props.match.params.id)}><FaCaretSquareODown className = 'dropdown'/></button>
                </div>
            </div>
        <p>Due: {value.due_date}</p>
    </div> : null
        )   
        })

var total = 1;
var complete =0;
        this.props.phases.map((value, i) => {
     return   value.done ? total++ && complete ++ : total++;  
})


var percentage = Math.round(complete / (total- 1) * 100);
       var progression = this.props.progress.map( (value, i) => {
          return(
            <div classname = 'progression-contain' key = {i}>
                <p className = 'content'>{value.content}</p>
                <p className = 'time-stamp'>{value.time_stamp}</p>
                <div className = 'log-btns'>
                    <h6 className = 'name' >- {value.displayname}</h6>
                    <button onClick = {() => this.props.deleteProgress(value.id, value.project_id)}><FaTrashO className = 'trash'/></button>
                    <button onClick = {() => this.updateToEdit(value.id, value.content, value.time_stamp, value.displayname)}><FaEdit className = 'edit-btn'/></button>
                </div>
            </div> 
          )
          
       })
       

        var renders = this.state.page === 'phases' && this.props.user.role === 'employee'? 
        <div>
            <Nav />
            <div className = 'phases-contain'>
                <Link to = '/projects'><button>Back</button></Link>
                <button onClick = {() => this.updateToProgress()}>View/Update Progress</button>
                <FillHouse percentage = {percentage}/>
                <h1>{percentage}%</h1>
                <h1>{this.props.project.name}</h1>
                <h2>{this.props.project.location}</h2>
                <button onClick = {() =>  this.updateToCreatePhase()}>Add Phase</button>
            </div>
            {phases}
        </div> : this.state.page === 'phases' && this.props.user.role === 'admin'? 
        <div>
            <Nav />
            <div className = 'phases-contain'>
                <div className = 'phase-btns'>
                    <Link to = '/projects'><button className = 'two-btns'>Back</button></Link>
                    <button  className = 'two-btns' onClick = {() => this.updateToProgress()}>Project Log</button>
                </div>
                <div className = 'percent-contain'>
                    <FillHouse percentage = {percentage}/>
                    <h1 className = 'percent'>{percentage}%</h1>
                </div>
                
                <h1>{this.props.project.name}</h1>
                <h2>{this.props.project.location}</h2>
                <button className = 'two-btns' onClick = {() =>  this.updateToCreatePhase()}>Add Phase</button>
            </div>
            
            {phases}
        </div> : 
        this.state.page === 'progress' ?
        <div>
            <Nav />
            <div className = 'progress-contain'>
            <button className = 'two-btns view-phases' onClick = {() => this.updateToPhases()}>View Phases</button>
                <div className = 'percent-contain'>
                    <FillHouse percentage = {percentage}/>
                    <h1 className = 'percent'>{percentage}%</h1>
                </div>
                
                <h1>{this.props.project.name}</h1>
                <h2>{this.props.project.location}</h2>
                
                <button className = 'two-btns' onClick = {() => this.setState({page: 'newlog'})}>New Entry</button>
                {progression}
            </div>
            
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
        
        : this.state.page === 'update_phase' && this.props.user.role === 'admin' ?
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
        </div> 
        : this.state.page === 'create_phase' && this.props.user.role === 'admin' ?
        <div>
            <Nav />
            <label>Enter New Phase Name: </label>
            <input type = 'text' onChange = {(e) => this.updateNewPhaseName(e.target.value)}/>
            <label>Description: </label>
            <input type = 'text' onChange = {(e) => this.updateNewPhaseDesc(e.target.value)}/>
            <label>Due Date (yyyy-mm-dd): </label>
            <input type = 'text' placeholder = 'yyyy-mm-dd' onChange = {(e) => this.updateNewPhaseDueDate(e.target.value)}/>
            <button onClick = {() =>  this.updateToPhases()}>Cancel</button>
            <button onClick = {() => this.createPhaseFn()}>Save</button>
        </div> : null

        return ( 
            <div className = 'project-page'>
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
export default connect(mapStateToProps, {getUser2, getProject, getProgress, deleteProgress, newLog, updateLog, getPhases, toggleDropdown, toggleDone, updatePhase, createPhase, deletePhase})(Project);