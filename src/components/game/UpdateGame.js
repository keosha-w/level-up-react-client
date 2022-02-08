import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { createGame, getGameTypes, getSingleGame, updateGame } from './GameManager.js'


export const UpdateGame = (id) => {
    const history = useHistory()
    const [gameTypes, setGameTypes] = useState([])
    const [currentGame, setCurrentGame] = useState({})
    const { gameId } = useParams()


    const [gameToUpdate, setGameToUpdate] = useState({
        skill_level: 0,
        number_of_players: 0,
        title: "",
        maker: "",
        game_type: 0
        
    })

    useEffect(() => {
        getGameTypes().then(data => setGameTypes(data))
    }, [])

    useEffect(() => {
        getSingleGame(gameId).then(data => setCurrentGame({
            skill_level: data.skill_level, 
            number_of_players: data.number_of_players, 
            title: data.title, 
            maker: data.maker, 
            game_type: data.game_type.id
        }))
    }, [gameId])

    const changeGameState = (domEvent) => {
        domEvent.preventDefault()
        const copy = {...currentGame}
        let key = domEvent.target.name
        copy[key] = domEvent.target.value
        setCurrentGame(copy)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" required autoFocus className="form-control"
                        value={currentGame.maker}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="skill_level">Skill level: </label>
                    <input type="number" name="skill_level" required autoFocus className="form-control"
                        value={currentGame.skill_level}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="number_of_players">NumberOfPlayers: </label>
                    <input type="number" name="number_of_players" required autoFocus className="form-control"
                        value={currentGame.number_of_players}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="game_type">GameType: </label>
                    <select name="game_type" required className="form-control"
                        value={currentGame.game_type}
                        onChange={changeGameState}>
                    <option value="0">Select a game type</option>
                    {
                        gameTypes.map(t => (
                            <option key={t.id} value={t.id}>{t.label}</option>
                        ))
                    }
                    </select>
                </div>
            </fieldset>


            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        maker: currentGame.maker,
                        title: currentGame.title,
                        number_of_players: parseInt(currentGame.number_of_players),
                        skill_level: parseInt(currentGame.skill_level),
                        game_type: parseInt(currentGame.game_type)
                        
                    }

                    // Send POST request to your API
                    updateGame(game, gameId)
                        .then(() => history.push("/games"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}