const initialState = {
    isLogged: false
};

const filter = (state=initialState, action) => {
    switch (action.type) {
        case 'AUTH_ACTION': 
        console.log(state);
        return {
            isLogged: action.payload
        };
        default: return state;
    }
}

export default filter;