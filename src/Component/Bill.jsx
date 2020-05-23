import React, { Component } from 'react'
import { connect } from 'react-redux'
import { generateBill } from '../Redux/actions'

class Bill extends Component {

    componentDidMount = () => {
        const { match, generateBill} = this.props
        console.log(match)
        generateBill(match.params)
    }

    render() {
        return (
            <>
            </>
        )
    }
}

const mapStateToProps = state => ({
    isLoading: state.isLoading,
    data: state.data,
    isError: state.isError

})

const mapDispatchToProps = dispatch => ({
    generateBill: payload => dispatch(generateBill(payload))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Bill);