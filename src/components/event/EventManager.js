export const getEvents = () => {
    return fetch("http://localhost:8000/events", {
        headers: {
            'Authorization': `Token ${localStorage.getItem('lu_token')}`
        }
    }
    ).then(res => res.json())
}

export const createEvent = (event) => {
    return fetch("http://localhost:8000/events", { 
        method: "POST",
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
            "Content-Type": 'application/json'
        } ,
        body: JSON.stringify(event)

    })
        .then(res => res.json())
}
export const EditEvent = (event, id) => {
    return fetch(`http://localhost:8000/events/${id}`, { 
        method: "Put",
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
            "Content-Type": 'application/json'
        } ,
        body: JSON.stringify(event)

    })
}

export const getSingleEvent = (id) => {
    
    return fetch(`http://localhost:8000/events/${id}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

export const leaveEvent = eventId => {
    return fetch(`http://localhost:8000/events/${eventId}/leave`, {
    method: "Delete",     
    headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        },
        body: JSON.stringify(eventId)
    })
  }
  
  export const joinEvent = eventId => {
    return fetch(`http://localhost:8000/events/${eventId}/signup`, {
    method: "Post", 
    headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        },
        body: JSON.stringify(eventId)
    })
  }