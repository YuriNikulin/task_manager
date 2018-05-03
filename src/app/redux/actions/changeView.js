const changeView = (view) => {
    return ({
        'type': 'CHANGE_VIEW',
        'payload': view
    })
}

export default changeView;