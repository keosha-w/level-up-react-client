import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { getGames } from "../game/GameManager"
import { createEvent, EditEvent, getEvents, getSingleEvent } from "./EventManager"


export const UpdateEventForm = (id) => {
    const history = useHistory()
    const [games, setGames] = useState([])
    const [currentEvent, setCurrentEvent] = useState({})
    const { eventId } = useParams()


    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])

    useEffect(() => {
        getSingleEvent(eventId).then(data => setCurrentEvent({
            game: data.game.id, 
            description: data.description, 
            date: data.date, 
            time: data.time
        }))
    }, [eventId])

    const changeEventState = (domEvent) => {
        domEvent.preventDefault()
        const copy = {...currentEvent}
        let key = domEvent.target.name
        copy[key] = domEvent.target.value
        setCurrentEvent(copy)
    }

    return (
        <form className="eventForm">
            <h2 className="eventForm__title">Register a New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentEvent.description}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input type="date" name="date" required autoFocus className="form-control"
                        value={currentEvent.date}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="skill_level">Time: </label>
                    <input type="time" name="time" required autoFocus className="form-control"
                        value={currentEvent.time}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="game">Game: </label>
                    <select name="game_id" required className="form-control"
                        value={currentEvent.game}
                        onChange={changeEventState}>
                    <option value="0">Select a event type</option>
                    {
                        games.map(g => (
                            <option key={g.id} value={g.id}>{g.title}</option>
                        ))
                    }
                    </select>
                </div>
            </fieldset>


            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const event = {
                        description: currentEvent.description,
                        date: currentEvent.date,
                        time: currentEvent.time,
                        game: currentEvent.game_id
                        
                    }

                    // Send POST request to your API
                    EditEvent(event, eventId)
                        .then(() => history.push("/events"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}