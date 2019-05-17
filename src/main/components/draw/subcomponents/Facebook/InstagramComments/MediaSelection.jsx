import React from 'react'
import { bindActionCreators } from "redux";
import { connect } from 'react-redux'
import { Collapse } from 'reactstrap'
import { setSelectedMedia } from "../../../../../redux/core/actions/instagramCommentsActions";
import If from '../../../../utils/If'

const MediaSelection = (props) => {

    const setMediaAndCallback = (media) => {
        let postCopy = { ...media }
        props.setSelectedMedia(postCopy)
        props.onMediaSelected(media)
    }

    const renderMediaRadio = (media) => {
        let id = `media-radio--${media.id}`
        return <>
            <input type="radio" id={id} className="custom-control-input"
                checked={props.selectedMedia ? props.selectedMedia.id === media.id : false}
                onChange={e => setMediaAndCallback(media)} />
            <label className="custom-control-label" htmlFor={id}>
                <img className="img-thumbnail mt-4" src={media.media_url || '/img/randomizador_icon_64.png'} alt="Post sem imagem" style={{ maxWidth: '160px' }} />
                <span className={`text-truncate d-block mt-2 mb-5 ${media.caption ? 'lead' : 'text-secondary'}`} style={{ maxWidth: 'calc(50vw)' }}>{media.caption || 'Post sem mensagem'}</span>
            </label>
        </>
    }

    return (
        <>
            <button className={`btn btn-outline-info btn-block text-left mt-3 ${props.enabled ? '' : 'disabled'}`}
                disabled={!props.enabled}
                onClick={() => props.setIsOpen(props.enabled && !props.isOpen)}>3- Escolher o post</button>
            <Collapse isOpen={props.enabled && props.isOpen}>
                <div className="card p-5 my-3">
                    <If c={props.medias.length > 0}>
                        <p className="lead text-center">Escolha o post para sortear!</p>
                        {
                            props.medias ? props.medias.map((p, i) => <div key={`page-posts-radio-key--${i}`} className="custom-control custom-radio">{renderMediaRadio(p)}</div>)
                                : ''}
                        <div className="container">
                            <div className="row">
                                <div className="col-6">
                                    <If c={props.previous}>
                                        <button onClick={() => props.paginateTo(props.previous)} className="btn btn-outline-success float-right">Anteriores</button>
                                    </If>
                                </div>
                                <div className="col-6">
                                    <If c={props.next}>
                                        <button onClick={() => props.paginateTo(props.next)} className="btn btn-outline-success">Próximos</button>
                                    </If>
                                </div>
                            </div>
                        </div>
                    </If>
                    <If c={!props.medias.length > 0}>Você não tem nenhum post</If>
                </div>
            </Collapse>
        </>
    )
}

const mapStateToProps = state => ({
    medias: state.instagramComments.medias,
    selectedMedia: state.instagramComments.selectedMedia,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    setSelectedMedia
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MediaSelection)