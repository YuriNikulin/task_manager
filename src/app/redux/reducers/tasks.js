const initialState = {
    tasksList: {},
};

const tasks = (state=initialState, action) => {
    switch (action.type) {
        case 'FETCH_TASKS':
            return ({
                tasksList: action.payload,
            });
        default: return state;
    }
}

export default tasks;