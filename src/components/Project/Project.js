import React, { Component } from 'react';
import axios from 'axios'
import {connect} from 'react-redux';
import {getProject, getUser2, getProgress, deleteProgress, newLog, updateLog, getPhases, toggleDropdown, toggleDone, updatePhase, createPhase, deletePhase, toggleShowClient} from '../../ducks/reducer';
import Nav from '../Nav/Nav';
import './Project.css';
import FillHouse from './FillHouse';
import {Link} from 'react-router-dom';
import IoAndroidCheckboxOutline from 'react-icons/lib/io/android-checkbox-outline';
import FaCaretSquareODown from 'react-icons/lib/fa/caret-square-o-down';
import FaEdit from 'react-icons/lib/fa/edit';
import FaTrashO from 'react-icons/lib/fa/trash-o';
import io from 'socket.io-client';
import FileUpload from '../FileUpload/FileUpload.js';
const socket = io();


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
            newPhaseDesc: '',
            messages: [],
            clientMessages: [],
            newClientMessage: ''
         }

         this.newLogFn = this.newLogFn.bind(this);
        
    }

    sendMessage(message, type){
        var currentDate = new Date()
        var time_stamp = (currentDate.getMonth()+1) + "/"
        + currentDate.getDate() + "/" 
        + currentDate.getFullYear() + " @ "  
        + currentDate.getHours() + ":"  
        + currentDate.getMinutes();

        let resObj = {
            message: message,
            displayname: this.props.user.displayname,
            time_stamp: time_stamp,
            project_id: this.props.match.params.id,
            user_id: this.props.user.id
        }
        socket.emit(`${type} message`, resObj)
        this.setState({
          newMessage: ''
        })
        let newMessBod = {
            message: message,
            user_id: this.props.user.id,
            project_id: this.props.match.params.id,
            time_stamp: time_stamp
        }
        axios.post(process.env.REACT_APP_ADD_MESSAGE, newMessBod).then(res => {
            return res.data
        })
      }

    updateNewMessage(newMessage){
        this.setState({
          newMessage
        })
      }

    componentDidMount(){
        let body = {
            project_id: this.props.match.params.id
        }
        axios.post(process.env.REACT_APP_GET_MESSAGES, body).then(res => {
            this.setState({
                messages: res.data
            })
        })
        this.props.getUser2();
        this.props.getProject(this.props.match.params.id, this.props.user.id);
        this.props.getProgress(this.props.match.params.id);
        this.props.getPhases(this.props.match.params.id)
        socket.on(`chat${this.props.match.params.id}`, data => {
            const messages = [data, ...this.state.messages];
            this.setState({
                messages: messages
            })
        })

        axios.post(process.env.REACT_APP_GET_CLIENT_MESSAGES, body).then(res => {
            var dbMessages = res.data.reverse().slice(0)
            this.setState({
                clientMessages: dbMessages
            })
        })
        socket.on(`client${this.props.match.params.id}`, data => {
            const clientMessages = [data, ...this.state.clientMessages];
            this.setState({
                clientMessages: clientMessages
            })
        })
    }

    updateNewClientMessage(e){
        this.setState({
            newClientMessage: e
        })
    }

    sendClientMessage(message, type){
        var currentDate = new Date()
        var time_stamp = (currentDate.getMonth()+1) + "/"
        + currentDate.getDate() + "/" 
        + currentDate.getFullYear() + " @ "  
        + currentDate.getHours() + ":"  
        + currentDate.getMinutes();

        let clientObj = {
            message: message,
            displayname: this.props.user.displayname,
            time_stamp: time_stamp,
            project_id: this.props.match.params.id,
            user_id: this.props.user.id,
            type: 'client'
        }
        socket.emit(`${type} message`, clientObj)
        this.setState({
          newClientMessage: ''
        })
        let newMessBod = {
            message: message,
            user_id: this.props.user.id,
            project_id: this.props.match.params.id,
            time_stamp: time_stamp,
            type: 'client'
        }
        axios.post(process.env.REACT_APP_ADD_CLIENT_MESSAGE, newMessBod).then(res => {
            return res.data
        })
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

    newLogFn(img_location){
        var currentDate = new Date()
        var time_stamp = (currentDate.getMonth()+1) + "/"
        + currentDate.getDate() + "/" 
        + currentDate.getFullYear() + " @ "  
        + currentDate.getHours() + ":"  
        + currentDate.getMinutes();
        this.props.newLog(this.state.content, this.props.user.id, this.props.match.params.id, time_stamp, img_location)
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

    updateToChat(){
        this.setState({
            page: 'chat'
        })
    }

    updateToClientChat(){
        this.setState({
            page: 'client-chat'
        })
    }

    translateToSpanish(message, index){
        let reqBod = {
            message: message
        }
        axios.post(process.env.REACT_APP_TO_SPANISH, reqBod).then(res => {
          var newMessages = this.state.messages.map((e, i) => {
              console.log('e', e)
              if (i === index){
                  console.log('message',e.message)
                  e.message = res.data
                  return e
              }
              else {return e}
          })
          console.log('translation',newMessages)
          this.setState({
              messages: newMessages
          })
        })
    }

    translateToEnglish(message, index){
        let reqBod = {
            message: message
        }
        axios.post(process.env.REACT_APP_TO_ENGLISH, reqBod).then(res => {
          var newMessages = this.state.messages.map((e, i) => {
              console.log('e', e)
              if (i === index){
                  console.log('message',e.message)
                  e.message = res.data
                  return e
              }
              else {return e}
          })
          console.log('translation',newMessages)
          this.setState({
              messages: newMessages
          })
        })
    }


    render() { 

       const mappedClientMessages = this.state.clientMessages.map((e, i) => {
           return e.user_id == this.props.user.id ?
           <div className = 'myMessages' key = {i}>
                <div className = 'message-title'>
                    <h3>{e.displayname}</h3>
                    <p>{e.time_stamp}</p>
                </div>
                <p>{e.message}</p>
            </div> :
            <div className = 'messages' key = {i}>
            <div className = 'message-title'>
                <h3>{e.displayname}</h3>
                <p className = 'time_stamp-class'>{e.time_stamp}</p>
            </div>
            <p>{e.message}</p>
            
        </div>
       })

        const mappedMessages = this.state.messages.map((e, i)=> {
           return e.user_id === this.props.user.id ?
            <div className = 'myMessages' key = {i}>
                <div className = 'message-title'>
                    <h3>{e.displayname}</h3>
                    <p>{e.time_stamp}</p>
                </div>
                <div className = 'mytranslators'>
                    <button onClick = {() => this.translateToSpanish(e.message, i)}>Spanish</button>
                    <button onClick = {() => this.translateToEnglish(e.message, i)}>English</button>
                </div>
                <p>{e.message}</p>
            </div> :
            <div className = 'messages' key = {i}>
                <div className = 'message-title'>
                    <h3>{e.displayname}</h3>
                    <p>{e.time_stamp}</p>
                </div>
                <div className = 'translators'>
                    <button onClick = {() => this.translateToSpanish(e.message, i)}>Spanish</button>
                    <button onClick = {() => this.translateToEnglish(e.message, i)}>English</button>
                </div>
                <p>{e.message}</p>
                
            </div>
            
          })
                                        //================//
                                        //=====PHASES=====/ 
                                        //================//
        var phases = this.props.phases.map((value, i) => {
        return (

                                //EMPLOYEE: SHOW DROPDOWN BUT NOT FINISHED PHASE//

            value.show_dropdown && value.done === false  && this.props.user.role === 'employee'? <div className = 'phase-not-done phase-dropdown' key = {i}>
            <div className = 'check-div'>
                <label>{i +1}.{value.phase_name}</label>
                <div className = 'project-btn-contain'>
                    <button className = 'btn-toggles' onClick = {() => this.props.toggleDone(value.id, this.props.match.params.id)}><IoAndroidCheckboxOutline className = 'check'/></button>
                    <button className = 'btn-toggles' onClick = {() => this.props.toggleDropdown(value.id, this.props.match.params.id)}><FaCaretSquareODown className = 'dropdown-open'/></button>
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
                <div className = 'project-btn-contain'>
                    <button className = 'btn-toggles' onClick = {() => this.props.toggleDone(value.id, this.props.match.params.id)}><IoAndroidCheckboxOutline className = 'check-done'/></button>
                    <button className = 'btn-toggles' onClick = {() => this.props.toggleDropdown(value.id, this.props.match.params.id)}><FaCaretSquareODown className = 'dropdown-open'/></button>
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
                <div className = 'project-btn-contain'>
                    <button className = 'btn-toggles' onClick = {() => this.props.toggleDone(value.id, this.props.match.params.id)}><IoAndroidCheckboxOutline className = 'check'/></button>
                    <button className = 'btn-toggles' onClick = {() => this.props.toggleDropdown(value.id, this.props.match.params.id)}><FaCaretSquareODown className = 'dropdown'/></button>
                </div>
            </div>
           
            <p>Due: {value.due_date}</p>            
       </div>
       
                                //EMPLOYEE: NOT SHOWING DROPDOWN AND FINISHED PHASE//

       : value.show_dropdown === false && value.done === true && this.props.user.role === 'employee' ?
       <div className = 'phase-done  phase-no-dropdown' key = {i}>
            <div className = 'check-div'>
                <label>{i +1}.{value.phase_name}</label>
                <div className = 'project-btn-contain'>
                    <button className = 'btn-toggles' onClick = {() => this.props.toggleDone(value.id, this.props.match.params.id)}><IoAndroidCheckboxOutline className = 'check-done'/></button>
                    <button className = 'btn-toggles' onClick = {() => this.props.toggleDropdown(value.id, this.props.match.params.id)}><FaCaretSquareODown className = 'dropdown'/></button>
                </div>
            </div>
            <p>Due: {value.due_date}</p>
        </div> 
        :                          //ADMIN: SHOW DROPDOWN BUT NOT FINISHED PHASE//

        value.show_dropdown && value.done === false && this.props.user.role === 'admin' ? 
    <div className = 'phase-not-done phase-dropdown' key = {i}>
        <div className = 'check-div'>
            <label>{i +1}.{value.phase_name}</label>
            <div className = 'project-btn-contain'>
                <button className = 'btn-toggles' onClick = {() => this.props.toggleDone(value.id, this.props.match.params.id)}><IoAndroidCheckboxOutline className = 'check'/></button>
                <button className = 'btn-toggles' onClick = {() => this.props.toggleDropdown(value.id, this.props.match.params.id)}><FaCaretSquareODown className = 'dropdown-open'/></button>
            </div>
        </div>
        <p>Due: {value.due_date}</p>
        <label>Assigned To Phase: {value.assigned_employee_id !== 17 ? <Link className = 'link-style' to = {`/employee/${value.assigned_employee_id}`}>{value.displayname}</Link> : <Link to = '/employees'><button className = 'two-btns'>Go To Employees To Assign</button></Link>}</label>
        <label>{value.assigned_employee_id !== 17 ? <p>With: {value.company}</p> : <p></p>}</label>
        <p>Description: {value.description}</p>
        <div className = 'admin-icons'>
            <button className = 'btn-toggles' onClick = {() => this.updateToPhaseUpdate(value.phase_name, value.due_date, value.description, value.id)}><FaEdit className = 'edit-btn'/></button>
            <button className = 'btn-toggles' onClick = {() => this.props.deletePhase(value.id, this.props.match.params.id)}><FaTrashO className = 'trash'/></button>
        </div>

   </div> 

                            //ADMIN: SHOW DROPDOWN AND FINSIHED PHASE//

   : value.show_dropdown && value.done && this.props.user.role === 'admin' ? 
   <div className = 'phase-done phase-dropdown' key = {i}>
        <div className = 'check-div'>
                <label>{i +1}.{value.phase_name}</label>
                <div className = 'project-btn-contain'>
                    <button className = 'btn-toggles' onClick = {() => this.props.toggleDone(value.id, this.props.match.params.id)}><IoAndroidCheckboxOutline className = 'check-done'/></button>
                    <button className = 'btn-toggles' onClick = {() => this.props.toggleDropdown(value.id, this.props.match.params.id)}><FaCaretSquareODown className = 'dropdown-open'/></button>
                </div>
            </div>
        <p>Due: {value.due_date} </p>
        <label>Assigned To Phase: {value.assigned_employee_id !== 17 ? <Link className = 'link-style' to = {`/employee/${value.assigned_employee_id}`}>{value.displayname}</Link> : <Link to = '/employees'><button className = 'two-btns'>Go To Employees To Assign</button></Link>} </label>
        <label>{value.assigned_employee_id !== 17 ? <p>With: {value.company}</p> : <p></p>}</label>
        <p>Description: {value.description}</p>
        <button className = 'btn-toggles' onClick = {() => this.props.deletePhase(value.id, this.props.match.params.id)}><FaTrashO className = 'trash' /></button>
   </div>

                            //ADMIN: NOT SHOWING DROPDOWN AND NOT FINISHED PHASE//

   : value.show_dropdown === false && value.done === false && this.props.user.role === 'admin' ?
   <div className = 'phase-not-done phase-no-dropdown' key = {i}>
        <div className = 'check-div'>
            <label>{i +1}.{value.phase_name}</label>
            <div className = 'project-btn-contain'>
                <button className = 'btn-toggles' onClick = {() => this.props.toggleDone(value.id, this.props.match.params.id)}><IoAndroidCheckboxOutline className = 'check'/></button>
                <button className = 'btn-toggles' onClick = {() => this.props.toggleDropdown(value.id, this.props.match.params.id)}><FaCaretSquareODown className = 'dropdown'/></button>
            </div>
        </div>
        <p>Due: {value.due_date}</p>
   </div>
   
                            //ADMIN: NOT SHOWING DROPDOWN AND FINISHED PHASE//

   : value.show_dropdown === false && value.done === true && this.props.user.role === 'admin' ?
   <div className = 'phase-done  phase-no-dropdown' key = {i}>
       <div className = 'check-div'>
                <label>{i +1}.{value.phase_name}</label>
                <div className = 'project-btn-contain'>
                    <button className = 'btn-toggles' onClick = {() => this.props.toggleDone(value.id, this.props.match.params.id)}><IoAndroidCheckboxOutline className = 'check-done'/></button>
                    <button className = 'btn-toggles' onClick = {() => this.props.toggleDropdown(value.id, this.props.match.params.id)}><FaCaretSquareODown className = 'dropdown'/></button>
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

       var roleRender = this.props.user.role === 'admin' && value.show_client ?
            <div className = 'progression-contain' key = {i}>
                <p className = 'content'>{value.content}</p>
                <button className = 'btn-toggles' onClick = {() => this.props.toggleShowClient(value.id, this.props.match.params.id)}>Don't Show Client <IoAndroidCheckboxOutline className = 'check-done'/></button>
                {value.image_url ? <a target='blank' href = {value.image_url}><img src = {value.image_url} alt = 'pic'/></a> : null}
                <p className = 'time-stamp'>{value.time_stamp}</p>
                <div className = 'log-btns'>
                    <h6 className = 'name' >- {value.displayname}</h6>
                    <button onClick = {() => this.props.deleteProgress(value.id, value.project_id)}><FaTrashO className = 'trash'/></button>
                    <button onClick = {() => this.updateToEdit(value.id, value.content, value.time_stamp, value.displayname)}><FaEdit className = 'edit-btn'/></button>
                </div>
            </div> 
            : this.props.user.role === 'admin' && value.show_client === false ?
            <div className = 'progression-contain' key = {i}>
                <p className = 'content'>{value.content}</p>
                <button className = 'btn-toggles' onClick = {() => this.props.toggleShowClient(value.id, this.props.match.params.id)}>Show Client <IoAndroidCheckboxOutline className = 'check'/></button>
                {value.image_url ? <a target='blank' href = {value.image_url}><img src = {value.image_url} alt = 'pic'/></a> : null}
                <p className = 'time-stamp'>{value.time_stamp}</p>
                <div className = 'log-btns'>
                    <h6 className = 'name' >- {value.displayname}</h6>
                    <button onClick = {() => this.props.deleteProgress(value.id, value.project_id)}><FaTrashO className = 'trash'/></button>
                    <button onClick = {() => this.updateToEdit(value.id, value.content, value.time_stamp, value.displayname)}><FaEdit className = 'edit-btn'/></button>
                </div>
            </div> 
            : this.props.user.role === 'employee' ?
            <div className = 'progression-contain' key = {i}>
                <p className = 'content'>{value.content}</p>
                {value.image_url ? <a target='blank' href = {value.image_url}><img src = {value.image_url} alt = 'pic'/></a> : null}
                <p className = 'time-stamp'>{value.time_stamp}</p>
                <div className = 'log-btns'>
                    <h6 className = 'name' >- {value.displayname}</h6>
                    <button onClick = {() => this.props.deleteProgress(value.id, value.project_id)}><FaTrashO className = 'trash'/></button>
                    <button onClick = {() => this.updateToEdit(value.id, value.content, value.time_stamp, value.displayname)}><FaEdit className = 'edit-btn'/></button>
                </div>
            </div> : null
          return(
             <div className ='progression-control2'>
                 {roleRender}
             </div>
          )
          
       })
       

        var renders = this.state.page === 'phases' && this.props.user.role === 'employee'? 
        <div>
            <Nav />
            <div className = 'phases-contain'>
                <div className = 'phase-btns'>
                    <Link to = '/projects'><button className = 'two-btns'>Back</button></Link>
                    <button  className = 'two-btns' onClick = {() => this.updateToProgress()}>Project Log</button>
                </div>
                <button className = 'two-btns chat-btn' onClick = {() => this.updateToChat()}>Chat</button>

                <div className = 'percent-contain'>
                    <FillHouse percentage = {percentage}/>
                    {percentage ? <h1 className = 'percent'>{percentage}%</h1> : <h1></h1>}
                </div>
               
                <h1>{this.props.project.name}</h1>
                <h2>{this.props.project.location}</h2>
            </div>
            <h1 className = 'phases-text'>Phases: </h1>
            {phases}
        </div> : this.state.page === 'phases' && this.props.user.role === 'admin'? 
        <div>
            <Nav />
            <div className = 'phases-contain'>
                <div className = 'phase-btns'>
                    <Link to = '/projects'><button className = 'two-btns'>Back</button></Link>
                    <button  className = 'two-btns' onClick = {() => this.updateToProgress()}>Project Log</button>
                </div>
                <button className = 'two-btns chat-btn' onClick = {() => this.updateToChat()}>Chat</button>

                <div className = 'percent-contain'>
                    <FillHouse percentage = {percentage}/>
                    {percentage ? <h1 className = 'percent'>{percentage}%</h1> : <h1></h1>}
                </div>
                
                <h1>{this.props.project.name}</h1>
                <h2>{this.props.project.location}</h2>
                <button className = 'two-btns' onClick = {() =>  this.updateToCreatePhase()}>Add Phase</button>
            </div>
            <h1 className = 'phases-text'>Phases: </h1>
            {phases}
        </div> : 
        this.state.page === 'progress' ?
        <div>
            <Nav />
            <div className = 'progress-contain'>
            <button className = 'two-btns view-phases' onClick = {() => this.updateToPhases()}>View Phases</button>
                <div className = 'percent-contain'>
                    <FillHouse percentage = {percentage}/>
                    {percentage ? <h1 className = 'percent'>{percentage}%</h1> : <h1></h1>}
                </div>
                
                <h1>{this.props.project.name}</h1>
                <h2>{this.props.project.location}</h2>
                
                <button className = 'two-btns' onClick = {() => this.setState({page: 'newlog'})}>New Entry</button>
                <div className = 'progression-control'>
                    {progression}
                </div>
            </div>
            
        </div> : this.state.page === 'newlog' ?
        <div>
            <Nav />
            <div className = 'newlog-contain'>
                <div className = 'log-back'>
                    <button className = 'two-btns' onClick = {() => this.updateToProgress()}>Back</button>
                    <p>Back</p>
                </div>
            
                <label>Enter New Entry Here: </label>
                <div className= 'newlog-input'>
                    <FileUpload newLogFn = {this.newLogFn}/>
                </div>
                <div className = 'progression-control'>
                    {progression}
                </div>
            </div>
            
        </div> : this.state.page === 'edit' ?
        <div>
            <Nav />
            <div className = 'newphase-contain'>
                <div className = 'newphase-section'>
                    <label>Enter Updated Content: </label>
                    <input className = 'description' placeholder = {this.state.currContent} onChange = {(e) => this.updateCurrContent(e.target.value)}/>
                </div>
                <p>{this.state.currTime}</p>
                <h6>- {this.state.currName}</h6>
                <div className = 'newphase-section'>
                    <button className = 'two-btns' onClick = {() => this.updateToProgress()}>Cancel</button>
                    <button className = 'two-btns-2' onClick = {() => this.updateLogFn()}>Save</button>
                </div>
                
            </div>
            
        </div> 
        
        : this.state.page === 'update_phase' && this.props.user.role === 'admin' ?
        <div>
            <Nav />
            <div className = 'newphase-contain'>
                <div className = 'newphase-section'>
                    <label>Enter New Phase Name: </label>
                    <input type = 'text' placeholder = {this.state.currPhaseName} onChange = {(e) => this.updateCurrPhaseName(e.target.value)}/>
                </div>
                 <div className = 'newphase-section'>
                    <label>Enter New Due Date (yyyy-mm-dd): </label>
                    <input type = 'text' placeholder = 'yyyy-mm-dd' onChange = {(e) => this.updateCurrPhaseDueDate(e.target.value)}/>
                 </div>
                <div className = 'newphase-section'>
                    <label>Enter New Description: </label>
                    <input className = 'description' type = 'text' placeholder = {this.state.currPhaseDesc} onChange = {(e) => this.updateCurrPhaseDesc(e.target.value)}/>
                </div>
                <div className = 'newphase-section'>
                    <button className = 'two-btns' onClick = {() =>  this.updateToPhases()}>Cancel</button>
                    <button className = 'two-btns-2' onClick = {() => this.updatePhaseFn()}>Save</button>
                </div>
            </div>
            
        </div> 
        : this.state.page === 'create_phase' && this.props.user.role === 'admin' ?
        <div>
            <Nav />
            <div className = 'newphase-contain'>
                <div className = 'newphase-section'>
                    <label>Enter New Phase Name: </label>
                    <input type = 'text' onChange = {(e) => this.updateNewPhaseName(e.target.value)}/>
                </div>
                <div className = 'newphase-section'>
                    <label>Description: </label>
                    <input className = 'description' type = 'text' onChange = {(e) => this.updateNewPhaseDesc(e.target.value)}/>
                </div>
                <div className = 'newphase-section'>
                    <label>Due Date (yyyy-mm-dd): </label>
                    <input type = 'text' placeholder = 'yyyy-mm-dd' onChange = {(e) => this.updateNewPhaseDueDate(e.target.value)}/>
                </div>
                <div className = 'newphase-section'>
                    <button className = 'two-btns' onClick = {() =>  this.updateToPhases()}>Cancel</button>
                    <button className = 'two-btns-2' onClick = {() => this.createPhaseFn()}>Save</button>
                </div>
            </div>
            
            
        </div> : this.state.page === 'chat' ?
        <div className = 'whole-contain'>
            <Nav />
            <div className = 'phases-contain'>
                <div className = 'phase-btns'>
                    <button className = 'two-btns' onClick = {() =>  this.updateToPhases()}>Back</button>
                    <button  className = 'two-btns' onClick = {() => this.updateToProgress()}>Project Log</button>
                </div>
                <div className = 'percent-contain'>
                    <FillHouse percentage = {percentage}/>
                    {percentage ? <h1 className = 'percent'>{percentage}%</h1> : <h1></h1>}
                </div>
                
                <h1>{this.props.project.name}</h1>
                <h2>{this.props.project.location}</h2>
                <button className = 'two-btns' onClick = {() => this.updateToClientChat()}>View Client Chat</button>
                <div className = 'chat-box'>
                    {mappedMessages}
                </div>
            <div className = 'new-message'>
                <input type = 'text' placeholder = 'Enter New Message' value = {this.state.newMessage} onChange = {(e) => this.updateNewMessage(e.target.value)}/>
                <button className = 'two-btns' onClick = {() => {this.sendMessage(this.state.newMessage, 'chat')}}>Post Message</button>
                
            </div>
            </div>
      </div> 
      : this.state.page === 'client-chat' ?
      <div>
        <Nav />
            <div className = 'phases-contain'>
                <div className = 'phase-btns'>
                    <button className = 'two-btns' onClick = {() =>  this.updateToPhases()}>Back</button>
                    <button  className = 'two-btns' onClick = {() => this.updateToProgress()}>Project Log</button>
                </div>
                <div className = 'percent-contain'>
                    <FillHouse percentage = {percentage}/>
                    {percentage ? <h1 className = 'percent'>{percentage}%</h1> : <h1></h1>}
                </div>
                
                <h1>{this.props.project.name}</h1>
                <h2>{this.props.project.location}</h2>
                <button className = 'two-btns' onClick = {() => this.updateToChat()}>View Employee Chat</button>
                <div className = 'chat-box'>
                    {mappedClientMessages}
                </div>
            <div className = 'new-message'>
                <input type = 'text' placeholder = 'Enter New Message' value = {this.state.newClientMessage} onChange = {(e) => this.updateNewClientMessage(e.target.value)}/>
                <button className = 'two-btns' onClick = {() => {this.sendClientMessage(this.state.newClientMessage, 'client')}}>Post Message</button>
                
            </div>
            </div>
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
export default connect(mapStateToProps, {getUser2, getProject, getProgress, deleteProgress, newLog, updateLog, getPhases, toggleDropdown, toggleDone, updatePhase, createPhase, deletePhase, toggleShowClient})(Project);