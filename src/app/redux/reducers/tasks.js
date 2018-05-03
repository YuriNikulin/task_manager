const initialState = {
    tasksList: {},
    tasksView: 'viewList'
};

const tasks = (state=initialState, action) => {
    switch (action.type) {
        case 'FETCH_TASKS':
            return ({
                ...state,
                tasksList: action.payload,
            });
        case 'CHANGE_VIEW': 
            return ({
                ...state,
                tasksView: action.payload
            })
        default: return state;
    }
}

export default tasks;