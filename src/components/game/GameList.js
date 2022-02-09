import React, { useEffect, useState } from "react"
import { deleteGame, getGames } from "./GameManager.js"
import { useHistory } from 'react-router-dom'
import { useParams } from "react-router-dom/cjs/react-router-dom.min"



export const GameList = (props) => {
    const [ games, setGames ] = useState([])
    const history = useHistory()
    const { gameId } = useParams()

    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])

    return (
        
        <article className="games">
            <button className="btn btn-2 btn-sep icon-create"
    onClick={() => {
        history.push({ pathname: "/games/new" })
    }}
>Register New Game</button>
            {
                
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        
                        <div className="game__title">{game.title} by {game.maker}</div>
                        <div className="game__players">{game.number_of_players} players needed</div>
                        <div className="game__skillLevel">Skill level is {game.skill_level}</div>
                        <button  onClick={() => {
                            editGame(game, game.id)
                        }}>Edit</button>
                        <button key={game.id} onClick={() => {
                            deleteGame(game, game.id)
                            .then(response => setGames(response))
                        }}>Delete</button>
                    </section>
                })
            }
        </article>
    )
}