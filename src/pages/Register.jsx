import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useUserContext } from '../context/UserContext'
import logo3 from "../images/logo3.png"

export default function Register() {

    const {loged, setLoged} = useUserContext()

    const userGood = /^[A-z][A-z0-9-_]{3,23}$/
    const passwordGood = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
    const emailGood = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    const dateGood = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/

    const [user, setUser] = useState("")
    const [pass, setPass] = useState("")
    const [rpass, setRpass] = useState("")
    const [email, setEmail] = useState("")
    const [date, setDate] = useState("")

    const [validUser, setValidUser] = useState(false)
    const [validPass, setValidPass] = useState(false)
    const [validEmail, setValidEmail] = useState(false)
    const [validDate, setValidDate] = useState(false)

    const navigate = useNavigate()

    useEffect(() =>{
        const result = userGood.test(user)
        console.log(result);
        setValidUser(result)
    },[user])

    useEffect(() =>{
        let result = passwordGood.test(pass)
        if(pass != rpass){ result = false}
        console.log(result);
        setValidPass(result)
    },[pass, rpass])

    useEffect(() =>{
        const result = emailGood.test(email)
        console.log(result);
        setValidEmail(result)
    },[email])

    useEffect(() =>{
        const result = dateGood.test(date)
        console.log(result);
        setValidDate(result)
    },[date])
    

    const createUser = (e) => {
        e.preventDefault()
        setUser(e.target.usuario.value)
        setPass(e.target.password.value)
        setRpass(e.target.Rpassword.value)
        setEmail(e.target.correo.value)
        setDate(e.target.age.value)
        if(!localStorage.hasOwnProperty(e.target.usuario.value)){
            if(validUser && validPass && validEmail && validDate){
                localStorage.setItem(e.target.usuario.value, e.target.password.value)
                localStorage.setItem(e.target.usuario.value+"favs", [])
                navigate("/login")
            }
            else{
                document.getElementById("formulario").reset()
            }
        }
    }

    return (
        <div className='main-sesion'>
            <img className="logoRyMs" src={logo3} alt="Logo de Rick y Morty" />
            <form className="formularioSesion" onSubmit={createUser} id="formulario">
                    <label htmlFor="nombre">
                        <input className="sesion" type="text" id="nombre" name="nombre" placeholder="Nombre" required />
                    </label>
                    <label htmlFor="correo">
                        <input className="sesion" type="email" id="correo" name="correo" placeholder="Correo" required />
                        <p className={!validEmail ? 'errorRegister': "bienRegister"}>El correo debe ser un correo válido</p>
                    </label>
                    <label htmlFor="usuario">
                        <input className="sesion" type="text" id="usuario" name="usuario" placeholder="Usuario" required />
                        <p className={!validUser ? 'errorRegister': "bienRegister"}>El nombre de usuario debe ser de 4 a 24 caracteres y empezar por una letra</p>
                    </label>
                    <label htmlFor="password">
                        <input className="sesion" type="password" id="password" name="password" placeholder="password" required />
                        <p className={!validPass ? 'errorRegister': "bienRegister"}>La contraseña debe ser de 8 a 24 caracteres y debe incluir mayúsculas y minúsculas, un número y un caracter especial, (caracteres especiales permitidos [!,@,#,$,%])</p>
                    </label>
                    <label htmlFor="Rpassword">
                        <input className="sesion" type="password" id="Rpassword" name="Rpassword" placeholder="Repetir password" required/>
                        <p className={!validPass ? 'errorRegister': "bienRegister"}>La contraseña debe ser de 8 a 24 caracteres y debe incluir mayúsculas y minúsculas, un número y un caracter especial, (caracteres especiales permitidos [!,@,#,$,%])</p>
                    </label>
                    <label htmlFor='age'>
                        <input className='sesion' type="date" id='age' name='age' required/>
                        <p className={!validDate ? 'errorRegister': "bienRegister"}>La fecha debe ser válida</p>
                    </label>
                    <label htmlFor='ads'>
                        <div className='checkbox'>
                            <input className='sesion' type="checkbox" id="ads" name='ads' required/>
                            <p className='formulario'>Quieres recibir publicidad completamente engañosa?</p>
                        </div>
                    </label>
                <input title="registrarse" className="boton" type="submit" placeholder="Registrarse" />
            </form>
        </div>
    )
}
