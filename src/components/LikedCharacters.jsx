import React, { useContext } from "react"
import { characterListPagination} from "../hooks/useFetch"

const LikedCharacters = ({characters = []}) => {

    function getEpisode(episode){
        const {data, loading, error} = characterListPagination(episode)

        if (loading) {
            return <h1>Loading</h1>
        }
        if (error){
            console.log(error)
        }
        return data.name
    }

    return (
        <section className="section-init">
            {   
                characters.map((character, index) => (
                    <article key={index} id={character.id} className="charactersInit">
                        <figure className="figure-init">
                            <img className="character" src={character.image} alt={character.name}/>
                        </figure>
                        <div>
                            <p className="name">{character.name}</p>
                            <div className="status">    
                                <span>{character.status} - {character.species}</span>
                                <span>{character.gender}</span>
                            </div>
                            <div className="morinfo">
                                <p>Location - {character.location.name}</p>
                                <p>First Appearence - {getEpisode(character.episode[0])}</p>
                            </div>
                        </div>
                    </article>
                ))
            }
        </section>
    )
}

export default LikedCharacters