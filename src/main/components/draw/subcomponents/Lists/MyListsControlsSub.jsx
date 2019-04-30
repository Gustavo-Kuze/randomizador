import React, { useState } from 'react'
import { Collapse, CardBody, Card } from 'reactstrap';

const MyListsControlsSub = () => {

    let [isCollapseOpen, toggleCollapse] = useState(false)

    return (
        <div>
            <button className="btn btn-outline-info btn-sm mb-3"
                onClick={() => toggleCollapse(!isCollapseOpen)} >Legenda</button>
            <Collapse isOpen={isCollapseOpen}>
                <Card>
                    <CardBody>
                        <table className="table table-striped table-borderless mt-3">
                            <thead>
                                <tr>
                                    <th>Símbolo</th>
                                    <th>Ação</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><span><i className="fa fa-plus text-success"></i></span></td>
                                    <td><span>Adicionar um novo item</span></td>
                                </tr>
                                <tr>
                                    <td><i className="fa fa-trash text-danger"></i></td>
                                    <td><span>Excluir um item</span></td>
                                </tr>
                                <tr>
                                    <td><i className="fa fa-times text-danger"></i></td>
                                    <td><span>Excluir lista</span></td>
                                </tr>
                                <tr>
                                    <td><span><i className="fas fa-check text-success"></i></span></td>
                                    <td><span>Este item será sorteado</span></td>
                                </tr>
                                <tr>
                                    <td><span><i className="fas fa-ban text-warning"></i></span></td>
                                    <td><span>Este item não será sorteado</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </CardBody>
                </Card>
            </Collapse>
        </div>
    )
}

export default MyListsControlsSub
