const removeNotification = (data) => {
    return ({
        'type': 'REMOVE_NOTIFICATION',
        'data': data
    })
}

export default removeNotification;