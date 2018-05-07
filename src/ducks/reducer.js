import axios from 'axios';

const initialState = {
    user: {},
    projects: [],
    project: {},
    progress: [],
    phases: [],
    employees: [],
    employee: {},
    employee_projects: []
}

const GET_USER = 'GET_USER';
const FINISH_CREATION = 'FINISH_CREATION';
const FINISH_EMPLOYEE = 'FINISH_EMPLOYEE';
const GET_USER_PROJECTS = 'GET_USER_PROJECTS';
const GET_PROJECT = 'GET_PROJECT';
const GET_PROGRESS = 'GET_PROGRESS';
const DELETE_PROGRESS = 'DELETE_PROGRESS';
const NEW_LOG = 'NEW_LOG';
const UPDATE_LOG = 'UPDATE_LOG';
const GET_PHASES = 'GET_PHASES';
const TOGGLE_DROPDOWN = 'TOGGLE_DROPDOWN';
const TOGGLE_DONE = 'TOGGLE_DONE';
const UPDATE_PHASE = 'UPDATE_PHASE';
const CREATE_PHASE = 'CREATE_PHASE';
const DELETE_PHASE = 'DELETE_PHASE';
const GET_EMPLOYEES = 'GET_EMPLOYEES';
const GET_EMPLOYEE_PROJECTS = 'GET_EMPLOYEE_PROJECTS';
const GET_EMPLOYEE = 'GET_EMPLOYEE';
const ASSIGN_PROJECT = 'ASSIGN_PROJECT';
const ASSIGN_PHASE = 'ASSIGN_PHASE';

export function assignProject(employee_id, project_id){
    let assignProjBod = {
       project_id: project_id,
       employee_id: employee_id
    }

   let assignProjAnswer = axios.post('http://localhost:3006/assign_project', assignProjBod).then(res => {
       console.log(res.data)
       return res.data
   })

   return {
       type: ASSIGN_PROJECT,
       payload: assignProjAnswer
   }
}

export function assignPhase(employee_id, phase_id){
    let assignPhaseBod = {
        employee_id: employee_id,
        phase_id: phase_id
    }

    let assignPhaseAnswer = axios.put('http://localhost:3006/assign_phase', assignPhaseBod).then( res => {
        return res.data
    })

    return {
        type: ASSIGN_PHASE,
        payload: assignPhaseAnswer
    }
}

export function getEmployee(employee_id){
    let empBody = {
        employee_id: employee_id
    }

    let empAnswer = axios.post('http://localhost:3006/get_employee', empBody).then( res => {
        return res.data
    })

    return {
        type: GET_EMPLOYEE,
        payload: empAnswer
    }
}

export function getEmployeeProjects(employee_id){
    let empProjBody = {
        employee_id: employee_id
    }

    let empProjAnswer = axios.post('http://localhost:3006/get_employee_projects', empProjBody).then(res => {
        return res.data
    })

    return {
        type: GET_EMPLOYEE_PROJECTS,
        payload: empProjAnswer
    }
}

export function getEmployees(user_id){
    let employeesBody = {
        user_id: user_id
    }

   let employeesAnswer = axios.post('http://localhost:3006/get_employees', employeesBody).then( res => {
        return res.data
    })

    return {
        type: GET_EMPLOYEES,
        payload: employeesAnswer
    }
}

export function deletePhase(phase_id, project_id){
    let delPhaseBody ={
        phase_id: phase_id,
        project_id: project_id
    }

    let delPhaseAnswer = axios.delete('http://localhost:3006/delete_phase', {data: delPhaseBody}).then(res => {
        return res.data
    })

    return {
        type: DELETE_PHASE,
        payload: delPhaseAnswer
    }
}

export function createPhase(project_id, phase_name, due_date, description){
    let createBody = {
        project_id: project_id,
        phase_name: phase_name,
        due_date: due_date,
        description: description
    }

    let createPhaseAnswer = axios.post('http://localhost:3006/create_phase', createBody).then( res => {
        return res.data
    })

    return {
        type: CREATE_PHASE,
        payload: createPhaseAnswer
    }
}

export function updatePhase(phase_name, due_date, description, phase_id, project_id){
    let upPhaseBody = {
        phase_name: phase_name,
        due_date: due_date,
        description: description,
        phase_id: phase_id,
        project_id: project_id
    }

    let upPhaseAnswer = axios.put('http://localhost:3006/update_phase', upPhaseBody).then( res => {
        return res.data
    })

    return {
        type: UPDATE_PHASE,
        payload: upPhaseAnswer
    }
}

export function toggleDone(phase_id, project_id){
    let doneBody = {
        id: phase_id,
        project_id: project_id
    }

    let doneAnswer = axios.post('http://localhost:3006/toggle_done', doneBody).then(res => {
        return res.data
    })

    return {
        type: TOGGLE_DONE,
        payload: doneAnswer
    }
}

export function toggleDropdown(phase_id, project_id){
    let toggleBody = {
        id: phase_id,
        project_id: project_id
    }

   let toggleAnswer = axios.post('http://localhost:3006/toggle_dropdown', toggleBody).then(res => {
        return res.data
    })

    return {
        type: TOGGLE_DROPDOWN,
        payload: toggleAnswer
    }
}

export function getPhases(project_id){
    let reqBody = {
        project_id: project_id
    }

   let phase = axios.post('http://localhost:3006/phases', reqBody).then(res => {
        return res.data
    })

    return {
        type: GET_PHASES,
        payload: phase
    }
}

export function updateLog(content, progress_id, project_id){
    let updateObj = {
        content: content,
        progress_id: progress_id,
        project_id: project_id
    }

    let updateAnswer = axios.put('http://localhost:3006/updatelog', updateObj).then(res => {
        return res.data
    })

    return {
        type: UPDATE_LOG,
        payload: updateAnswer
    }
}

export function newLog(content, user_id, project_id, time_stamp){
    let logObj = {
        content: content,
        user_id: user_id,
        project_id: project_id,
        time_stamp: time_stamp
    }

    let newLogAnswer = axios.post('http://localhost:3006/newlog', logObj).then(res => {
        return res.data
    })

    return {
        type: NEW_LOG,
        payload: newLogAnswer
    }
}

export function deleteProgress(progress_id, project_id){
    let delObj = {
        progress_id: progress_id,
        project_id: project_id
    }
    let delprogress = axios.delete('http://localhost:3006/deleteprogress', {data: delObj}).then(res => {
        return res.data
    })

    return {
        type: DELETE_PROGRESS,
        payload: delprogress
    }
}

export function getProgress(project_id){
    let progObj = {
        project_id: project_id
    }
    let projectProgress = axios.post('/progress', progObj).then(res => {
        return res.data
    })
    
    return {
        type: GET_PROGRESS,
        payload: projectProgress
    }
}

export function getProject(project_id, user_id){
    let newObj = {
        project_id: project_id,
        user_id: user_id
    }
    let clickedProject = axios.post('/clickedproject', newObj).then(res => {
       
        return res.data
    })

    return {
        type: GET_PROJECT,
        payload: clickedProject
    }
}

export function getProjects(){
    let projectData = axios.get('/userprojects').then(res => {
        return res.data
    })
    return {
        type: GET_USER_PROJECTS,
        payload: projectData
    }
}

export function getUser(){
    let userData = axios.get('/auth/me').then(res => {
        if (res.data.role && res.data.company){
            window.location.replace(`http://localhost:3000/#/home/${res.data.role}`);
        }
        
        return res.data
    })
    
    return {
        type: GET_USER,
        payload: userData
    }
}

export function getUser2(){
    let userData2 = axios.get('/auth/me').then(res => { 
        return res.data
    })
    
    return {
        type: GET_USER,
        payload: userData2
    }
}

export function finishEmployee(company, role, supervisor, id){
    let finBody = {
        company: company,
        role: role,
        supervisor: supervisor,
        id: id
    }

    axios.post('http://localhost:3006/finish_employee', finBody).then( res => {
        return res.data
    })

    return {
        type: FINISH_EMPLOYEE,
        payload: finBody
    }
}

export function finishCreation(company, role, id, user_id, displayname){
    const obj = {
        company: company,
        role: role,
        id: id, 
        user_id: user_id,
        displayname: displayname
    }
    axios.post(`http://localhost:3006/finishprofile`, obj).then(res => {
        return res.data
    })
    return {
        type: FINISH_CREATION,
        payload: obj
    }
}

export default function reducer(state = initialState, action){
    switch(action.type){
        case GET_USER + '_FULFILLED':
            return Object.assign({}, state, {user: action.payload})

        case FINISH_CREATION + '_FULFILLED':
            return Object.assign({}, state, {user: action.payload})

        case GET_USER_PROJECTS + '_FULFILLED':
            return Object.assign({}, state, {projects: action.payload})

        case GET_PROJECT + '_FULFILLED':
            return Object.assign({}, state, {project: action.payload})

        case GET_PROGRESS + '_FULFILLED':
            return Object.assign({}, state, {progress: action.payload})

        case DELETE_PROGRESS + '_FULFILLED':
            return Object.assign({}, state, {progress: action.payload})

        case NEW_LOG + '_FULFILLED':
            return Object.assign({}, state, {progress: action.payload})

        case UPDATE_LOG + '_FULFILLED':
            return Object.assign({}, state, {progress: action.payload})

        case GET_PHASES + '_FULFILLED':
            return Object.assign({}, state, {phases: action.payload})

        case TOGGLE_DROPDOWN + '_FULFILLED':
            return Object.assign({}, state, {phases: action.payload})

        case TOGGLE_DONE + '_FULFILLED':
            return Object.assign({}, state, {phases: action.payload})

        case UPDATE_PHASE + '_FULFILLED':
            return Object.assign({}, state, {phases: action.payload})

        case CREATE_PHASE + '_FULFILLED':
            return Object.assign({}, state, {phases: action.payload})

        case DELETE_PHASE + '_FULFILLED':
            return Object.assign({}, state, {phases: action.payload})

        case GET_EMPLOYEES + '_FULFILLED':
            return Object.assign({}, state, {employees: action.payload})

        case FINISH_EMPLOYEE + '_FULFILLED':
            return Object.assign({}, state, {user: action.payload})

        case GET_EMPLOYEE_PROJECTS + '_FULFILLED':
            return Object.assign({}, state, {employee_projects: action.payload})

        case GET_EMPLOYEE + '_FULFILLED':
            return Object.assign({}, state, {employee: action.payload})

        case ASSIGN_PROJECT + '_FULFILLED':
            return Object.assign({}, state, {employee_projects: action.payload})

        case ASSIGN_PHASE + '_FULFILLED':
            return Object.assign({}, state, {employee_projects: action.payload})

        default:
        return state;
    } 
}