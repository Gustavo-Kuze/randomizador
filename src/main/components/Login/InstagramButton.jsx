import React from 'react'
import InstagramLogin from 'react-instagram-login'

const InstagramButton = () => {
    const responseInstagram = (response) => {
        console.log(response);
    }

    return (
        <InstagramLogin
            clientId="77aa5bbae1ea4fefb7c16dd17d594aec"
            buttonText="Entrar com Instagram"
            onSuccess={responseInstagram}
            onFailure={responseInstagram}
        />
    )
}

export default InstagramButton
