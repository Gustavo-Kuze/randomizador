import React from 'react'
import { Collapse } from 'reactstrap'
import { setAuthResponse } from '../../../../../redux/core/actions/facebookLoginActions'
import { bindActionCreators } from "redux";
import { connect } from 'react-redux'
import { setSelectedPage } from "../../../../../redux/core/actions/facebookCommentsActions";
import If from '../../../../utils/If'

const PageSelection = (props) => {

    const setPageAndCallback = (page) => {
        props.setSelectedPage(page)
        props.onPageSelected(page)
    }

    const renderPageRadio = (page) => <>
        <input type="radio" id={`page-radio-${page.name}`} className="custom-control-input"
            checked={props.selectedPage ? props.selectedPage.name === page.name : false}
            onChange={e => setPageAndCallback(page)} />
        <label className="custom-control-label" htmlFor={`page-radio-${page.name}`}>{page.name}</label>
    </>

    return (
        <>
            <button className={`btn btn-outline-${props.isInstagram ? 'info' : 'primary'} btn-block text-left mt-3 ${props.enabled ? '' : 'disabled'}`}
                disabled={!props.enabled}
                onClick={() => props.setIsOpen(props.enabled && !props.isOpen)}>1- Escolher sua página</button>
            <Collapse isOpen={props.enabled && props.isOpen}>
                <div className="card p-5 my-3">
                    <If c={props.userPages.length > 0}>
                        <p className="lead text-center">Escolha a página que contém o post para sortear!</p>
                        {
                            props.userPages ?
                                props.userPages.map((p, i) => (
                                    <div key={`page-radio-key--${i}`} className="custom-control custom-radio">{renderPageRadio(p)}</div>)
                                )
                                : ''}
                    </If>
                    <If c={!props.userPages.length > 0}>Você não tem nenhuma página ou ainda não deu as permissões para o App</If>
                </div>
            </Collapse>
        </>
    )
}

const mapStateToProps = state => ({
    userPages: state.facebookComments.userPages,
    selectedPage: state.facebookComments.selectedPage,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    setAuthResponse, setSelectedPage
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(PageSelection)