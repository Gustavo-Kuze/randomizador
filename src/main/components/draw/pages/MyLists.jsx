import React from 'react'
import Template from '../../Template'
import List from '../subcomponents/Lists/'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addList } from '../../../redux/core/actions/listsActions'

const MyLists = (props) => {
   
    return (
        <Template>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1>Minhas listas</h1>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-6">
                        <button className="btn btn-outline-primary" onClick={props.addList}>Nova lista</button>
                    </div>
                </div>
                <div className="row">
                    {
                        props.lists.map((l, i) => (
                            <div key={`list-div-${l.id}--${i}`} className="col-md-6">
                                <List list={l} items={l.items} />
                            </div>
                        ))
                    }
                </div>
            </div>
        </Template>
    )
}

const mapStateToProps = state => ({
    lists: state.lists
})

const mapDispatchToProps = dispatch => bindActionCreators({
    addList
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MyLists)