const initialState = [
        {
            name: 'test',
            id: 0 
        },
        {
            name: 'hi there',
            id: 1
        }
];

const track = (state=initialState, action) => {
    switch (action.type) {
        case 'ADD_TRACK': return [...state, 
            {
                name: action.payload.name,
                id: action.payload.id
            }
        ];
        case 'REMOVE_TRACK': return state.filter((elem) => {
            return (elem.id !== action.payload);
        });
        case 'FETCH_TRACKS_SUCCESS': 
            console.log('kek');
            return action.payload;
        default: return state;
    }
}

export default track;