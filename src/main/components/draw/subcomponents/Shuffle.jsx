import '../../css/Sort.css'
import React, { useState } from 'react'
import { Input } from 'reactstrap'
import FilePicker from '../../utils/FilePicker'
import If from '../../utils/If'
import DrawResults from '../subcomponents/DrawResults'
import Chance from 'chance'
let chance = new Chance()

const Shuffle = () => {

    const [phrases, setPhrases] = useState('')
    const [shuffledPhrases, setShuffledPhrases] = useState('')

    const shufflePhrases = () => {
        let phrasesArr = phrases.split('\n').filter(p => p !== '')
        phrasesArr = chance.shuffle(phrasesArr)
        setShuffledPhrases(phrasesArr.join('\n'))
        document.getElementById('input-resultado').scrollIntoView(true)
    }

    const onFilePicked = (fileContent) => {
        try {
            setPhrases(fileContent)
        } catch (err) { }
    }

    return (
        <div className="section">
            <div className="jumbotron">
                <div className="row">
                    <div className="col text-center mb-5">
                        <h3>Digite as frases ou nomes para sortear, separadas por quebras de linha (Enter)</h3>
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
                        <Input type="textarea" className="sort-textarea bg-light" rows="10" value={phrases} onChange={e => setPhrases(e.target.value)} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-8 offset-2 col-md-6 offset-md-3">
                        <button className="btn btn-warning btn-block mt-5" onClick={shufflePhrases}>Sortear</button>
                    </div>
                </div>
                <If c={shuffledPhrases.length > 0} cssHide={true}>
                    <div>
                        <DrawResults title="Resultado:" colClasses="col-10 offset-1 col-md-8 offset-md-2">
                            <Input id="input-resultado" type="textarea" className="sort-textarea bg-light" value={shuffledPhrases} rows="10" readOnly="readonly" />
                        </DrawResults>
                    </div>
                </If>
            </div >
        </div>
    )
}

export default Shuffle
