const initialState = {
    tasksList: {},
    tasksView: 'LIST'
};

const tasks = (state=initialState, action) => {
    switch (action.type) {
        case 'FETCH_TASKS':
            return ({
                tasksList: action.payload,
            });
        case 'CHANGE_VIEW': 
            return ({
                tasksView: action.payload
            })
        default: return state;
    }
}

export default tasks;