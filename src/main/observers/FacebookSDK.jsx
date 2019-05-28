import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

export class FacebookSDK extends Component {

    constructor(props){
        super(props)

        this.observerTimer = setInterval(timer, 100);
    }

    componentWillUnmount(){
        clearInterval(this.observerTimer)
    }

    timer = () => {
        
    }

    render() {
        return <></>
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = dispatch => bindActionCreators({
    
}, dispatch) 

export default connect(mapStateToProps, mapDispatchToProps)(FacebookSDK)
