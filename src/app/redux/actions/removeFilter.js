const removeFilter = (data) => {
    return ({
        'type': 'REMOVE_FILTER',
        'data': data
    })
}

export default removeFilter;