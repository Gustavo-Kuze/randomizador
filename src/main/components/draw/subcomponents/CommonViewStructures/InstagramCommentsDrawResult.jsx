import React from 'react'
import { Container, Row, Col, Card } from 'reactstrap'

const FacebookCommentsDrawResult = (props) => {
    return (
        <Container>
            <Row className="my-5">
                <Col>
                    <h5>Link do post</h5>
                    <a href={props.items[0].permalink} target="_blank" rel="noopener noreferrer">{props.items[0].permalink}</a>
                </Col>
            </Row>
            {
                props.items.map((c, i) => (
                    <Row className="my-5" key={c.id}>
                        <Col>
                            <Card className="p-4">
                                <h4>{i + 1}º item sorteado</h4>
                                <h6 className="mt-2">Id do comentário</h6>
                                <p className="">{c.id}</p>
                                <h5>Nome do usuário</h5>
                                <p className="lead">{c.username}</p>
                                <h5>Texto do comentário</h5>
                                <p className="lead">{c.text}</p>
                            </Card>
                        </Col>
                    </Row>
                ))
            }
        </Container>
    )
}

export default FacebookCommentsDrawResult
