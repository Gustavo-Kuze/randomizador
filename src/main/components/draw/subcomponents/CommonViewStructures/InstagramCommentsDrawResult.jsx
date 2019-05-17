import React from 'react'

const FacebookCommentsDrawResult = (props) => {
    return (
        <div className="container">
            <div className="row my-5">
                <div className="col">
                    <h5>Link do post</h5>
                    <a href={props.items[0].permalink} target="_blank" rel="noopener noreferrer">{props.items[0].permalink}</a>
                </div>
            </div>
            {
                props.items.map((c, i) => (
                    <div className="row my-5" key={c.id}>
                        <div className="col">
                            <div className="card p-4">
                                <h4>{i + 1}º item sorteado</h4>
                                <h6 className="mt-2">Id do comentário</h6>
                                <p className="">{c.id}</p>
                                <h5>Nome do usuário</h5>
                                <p className="lead">{c.username}</p>
                                <h5>Texto do comentário</h5>
                                <p className="lead">{c.text}</p>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default FacebookCommentsDrawResult
