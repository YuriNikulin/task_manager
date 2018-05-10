const pushNotification = (data) => {
    return ({
        'type': 'PUSH_NOTIFICATION',
        'data': data
    })
}

export default pushNotification;