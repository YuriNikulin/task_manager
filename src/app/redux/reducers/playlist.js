const initialState = [
    {
        name: 'playlist',
        id: 0 
    },
    {
        name: 'second playlist',
        id: 1
    }
];

const playlist = (state=initialState, action) => {
    switch (action.type) {
        case 'ADD_PLAYLIST': return [...state, 
            {
                name: action.payload.name,
                id: action.payload.id
            }
        ];
        case 'REMOVE_PLAYLIST': return state.filter((elem) => {
           return (elem.id !== action.payload);
        });
        default: return state;
    }
}

export default playlist;