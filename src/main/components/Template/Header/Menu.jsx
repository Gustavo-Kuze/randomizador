import React, { useState, useEffect } from 'react'
import firebase from '../../../services/firebase'
import { Link } from 'react-router-dom'

import {
    ListGroup,
} from 'reactstrap'

const Menu = () => {
    const [userName, setUserName] = useState('Convidado')

    useEffect(() => {
        if (firebase.auth().currentUser) {
            if (firebase.auth().currentUser.displayName) {
                setUserName(firebase.auth().currentUser.displayName)
            }
        }
    })

    return <>
        <p className="lead">{`Bem-vindo(a), ${userName}`}</p>
        <ListGroup className="text-center">
            <p className="text-secondary">Ferramentas de sorteio</p>
            <Link to="/user/lists" className="list-group-item list-group-item-action" >Minhas listas</Link>
            <Link to="/numbers" className="list-group-item list-group-item-action" >Sorteio de números</Link>
            <Link to="/shuffle" className="list-group-item list-group-item-action" >Embaralhador de frases</Link>
            <Link to="/headortails" className="list-group-item list-group-item-action" >Cara ou Coroa</Link>
            <Link to="/facebook" className="list-group-item list-group-item-action" >Comentários do Facebook</Link>
            <p className="text-secondary mt-3">Resultados de sorteio</p>
            <Link to="/myresults" className="list-group-item list-group-item-action" >Meus sorteios</Link>
            <hr />
            <Link to="/about" className="list-group-item list-group-item-action" >Sobre</Link>
            <hr />
            <Link to="/login" className="list-group-item list-group-item-action bg-primary text-light" >Login</Link>
            <Link to="/logout" className="list-group-item list-group-item-action bg-danger text-light" >Sair da conta</Link>
        </ListGroup>
    </>
}

export default Menu
