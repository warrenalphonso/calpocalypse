/** 
 * MOVEMENT. The following functions create Fetch API requests to PATCH player movement. 
 * Compatible with WASD or arrow keys.  
 **/
const moveLeft = (port, id) => {
    fetch(port + `/players/${id}/-1/0`, {
            method: 'PATCH'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('PATCH for moving left failed!')
            }
        }).catch(error => {
            console.log(error)
        })
}

const moveRight = (port, id) => {
    fetch(port + `/players/${id}/1/0`, {
            method: 'PATCH'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('PATCH for moving right failed!')
            }
        }).catch(error => {
            console.log(error)
        })
}

const moveUp = (port, id) => {
    fetch(port + `/players/${id}/0/1`, {
        method: 'PATCH'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('PATCH for moving up failed!')
        }
    }).catch(error => {
        console.log(error)
    })
}

const moveDown = (port, id) => {
    fetch(port + `/players/${id}/0/-1`, {
        method: 'PATCH'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('PATCH for moving down failed!')
        }
    }).catch(error => {
        console.log(error)
    })
}

export {moveLeft, moveRight, moveUp, moveDown}