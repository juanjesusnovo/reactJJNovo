import React, { useEffect, useState } from 'react'
import "../sass/styles.sass"
import { BallTriangle } from "react-loader-spinner"
import { NavLink, useNavigate } from 'react-router-dom'
import { characterListPagination} from "../hooks/useFetch"
import { useUserContext } from "../context/UserContext"
import LikedCharacters from '../components/LikedCharacters'



export default function myFavs() {

    const {user, setUser, favs, setFavs, loged, setLoged} = useUserContext()
    const navigate = useNavigate()

    const { data, loading, error } = characterListPagination(`https://rickandmortyapi.com/api/character/${favs}`)

    if (loading) {
        return (<BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#4fa94d"
            ariaLabel="ball-triangle-loading"
            wrapperClass={{}}
            wrapperStyle=""
            visible={true}
        />)
    }
    if (error) {
        return(
            navigate("/")
        )
    }
        
    return(
        <main className="main-inix">+
            <LikedCharacters characters={data}></LikedCharacters>
        </main>
    )
}
