import '../../css/HeadOrTails.css'
import React, { useEffect } from 'react'

const HeadOrTails = () => {

    const flip = () => {
        const moeda = document.getElementById('moeda')

        var flipResult = Math.random();
        moeda.className = ''

        setTimeout(function () {
            if (flipResult <= 0.5) {
                moeda.classList.add('heads')
                console.log('it is head');
            }
            else {
                moeda.classList.add('tails')
                console.log('it is tails');
            }
        }, 15);
    }

    return (
        <>
            <div className="section">
                <div className="container">
                    <div className="row">
                        <div className="col">
                        <h1 class=""></h1>
                        </div>
                    </div>
                </div>
            </div>
            <div id="moeda" onClick={flip}>
                <div class="cara">
                    <img src="/img/cara.jpg" alt="Cara" />
                </div>
                <div class="coroa">
                    <img src="/img/coroa.jpg" alt="Coroa" />
                </div>
            </div>
            <div className="spacer">
            </div>
        </>
    )
}

export default HeadOrTails
