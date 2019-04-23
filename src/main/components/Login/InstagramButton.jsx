import React from 'react'
import InstagramLogin from 'react-instagram-login'

const InstagramButton = () => {
    const successCallback = (response) => {
        
        fetch(`https://api.instagram.com/v1/users/self/media/recent?access_token=${response}`).then(resp => {
            console.log(resp.json())
        })
        console.log(response);
    }
   
    const errorCallback = (response) => {
        console.log(response);
    }

    return (
        <InstagramLogin
            clientId="77aa5bbae1ea4fefb7c16dd17d594aec"
            buttonText="Entrar com Instagram"
            onSuccess={successCallback}
            onFailure={errorCallback}
        />
    )
}

export default InstagramButton
