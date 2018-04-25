import axios from 'axios';

const initialState = {
    user: {},
    projects: [],
    project: {},
    progress: []
}

const GET_USER = 'GET_USER';
const FINISH_CREATION = 'FINISH_CREATION';
const GET_USER_PROJECTS = 'GET_USER_PROJECTS';
const GET_PROJECT = 'GET_PROJECT';
const GET_PROGRESS = 'GET_PROGRESS';
const DELETE_PROGRESS = 'DELETE_PROGRESS';

export function deleteProgress(progress_id, project_id){
    let delObj = {
        progress_id: progress_id,
        project_id: project_id
    }
    let delprogress = axios.post('http://localhost:3006/deleteprogress', delObj).then(res => {
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

        default:
        return state;
    } 
}