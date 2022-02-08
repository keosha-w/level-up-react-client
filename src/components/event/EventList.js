import React, { useEffect, useState } from "react"
import { getEvents } from "./EventManager.js"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"


export const EventList = (props) => {
    const [ events, setEvents ] = useState([])
    const history = useHistory()
    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    return (
        <>
        <button className="btn btn-2 btn-sep icon-create"
    onClick={() => {
        history.push({ pathname: "/events/new" })
    }}
>Register New Event</button>
        {events.map((event) => {
            return (
                <section>
                    <h2>{event.game.title}</h2>
                    <div>{event.description}</div>
                    <p>Happening at {event.date} {event.time}</p>
                </section>)
            
        })}
        </>
    )
}