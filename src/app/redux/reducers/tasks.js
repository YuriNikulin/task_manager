const initialState = {
    tasksList: {},
    tasksView: 'viewList',
    tasksFilter: [],
    tasksSort: {}
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
            });
        case 'APPLY_FILTER':
            return ({
                ...state,
                tasksFilter: [
                    ...state.tasksFilter,
                    action.data
                ]
            });
        case 'REMOVE_FILTER':
            return ({
                ...state,
                tasksFilter: state.tasksFilter.filter(item => !(item.key == action.data.key && item.value == action.data.value))
            });
        case 'REMOVE_ALL_FILTERS':
            return ({
                ...state,
                tasksFilter: []
            });
        case 'APPLY_SORT':
            let type = 'asc';
            if (state.tasksSort.key && (state.tasksSort.key == action.data)) {
                type = (state.tasksSort.type == 'asc' ? 'desc' : 'asc');
            }
            return ({
                ...state,
                tasksSort: {
                    key: action.data,
                    type: type
                }
            })    
        default: return state;
    }
}

export default tasks;