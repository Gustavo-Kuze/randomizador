import '../../css/Sort.css'
import React, { useState } from 'react'
import { Input } from 'reactstrap'
import FilePicker from '../../utils/FilePicker'
import If from '../../utils/If'
import DrawResults from '../subcomponents/DrawResults'
import drawTypes from '../drawUtils/drawTypes'
import Chance from 'chance'
let chance = new Chance()

const Shuffle = () => {

    const [phrases, setPhrases] = useState('')
    const [shuffledPhrases, setShuffledPhrases] = useState('')
    const [resultCopied, setResultCopied] = useState(false)


    const shufflePhrases = () => {
        setResultCopied(false)
        let phrasesArr = phrases.split('\n').filter(p => p !== '')
        phrasesArr = chance.shuffle(phrasesArr)
        setShuffledPhrases(phrasesArr.join('\n'))
        setTimeout(() =>
            document.getElementById('input-resultado').scrollIntoView(true), 20);
    }

    const onFilePicked = (fileContent) => {
        try {
            setPhrases(fileContent)
        } catch (err) { }
    }

    const copyResult = () => {
        let input = document.getElementById('input-resultado')
        input.select()
        document.execCommand('copy')
        setResultCopied(true)
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12 col-md-8 offset-md-2 text-center my-3">
                    <h3>Digite as frases ou nomes para sortear, separados por quebras de linha (Enter)</h3>
                </div>
            </div>
            <div className="row">
                <div className="col text-center">
                    <p className="lead">ou clique para escolher um arquivo de texto</p>
                    <FilePicker onPicked={onFilePicked} />
                </div>
            </div>
            <div className="row">
                <div className="col-10 offset-1 col-md-8 offset-md-2">
                    <Input type="textarea" className="sort-textarea" rows="3" value={phrases} onChange={e => setPhrases(e.target.value)} placeholder="Digite as frases aqui" />
                </div>
            </div>
            <div className="row">
                <div className="col-8 offset-2 col-md-6 offset-md-3">
                    <button className="btn btn-warning btn-block mt-5 mb-5" onClick={shufflePhrases}>Embaralhar</button>
                </div>
            </div>
            <If c={shuffledPhrases.length > 0} cssHide={true}>
                <div>
                    <hr />
                    <DrawResults title="Resultado:" colClasses="col-10 offset-1 col-md-8 offset-md-2"
                        date={`${new Date().toLocaleString()}`}
                        drawType={drawTypes.SHUFFLE}
                        result={shuffledPhrases}
                    >
                        <div className="d-flex justify-content-betweend align-items-center flex-column">
                            <Input id="input-resultado" type="textarea" className="sort-textarea" value={shuffledPhrases} rows="10" readOnly="readonly" />
                            <button className="btn btn-outline-success mt-3" onClick={copyResult}>
                                {resultCopied ? 'Copiado' : 'Copiar'} <i className={`${resultCopied ? 'fas fa-clipboard-check' : 'far fa-clipboard'} fa-lg`}></i>
                            </button>
                        </div>
                    </DrawResults>
                </div>
            </If>
        </div >
    )
}

export default Shuffle
