import React from 'react'

const NumbersDrawResult = (props) => {
    return (
        <table className="table table-striped table-bordered h3 text-center">
            <thead>
                <tr>
                    <th>Posição</th>
                    <th>Número sorteado</th>
                </tr>
            </thead>
            <tbody>
                {props.items.map((n, i) => (
                    <tr key={`${n}--${i}_${n}`}>
                        <td>{++i}º</td>
                        <td>{n}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default NumbersDrawResult
