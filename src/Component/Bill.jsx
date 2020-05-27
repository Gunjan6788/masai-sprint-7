import React, { Component } from 'react'
import { connect } from 'react-redux'
import { generateBill } from '../Redux/actions'
import uuidv4 from 'uuid'

class Bill extends Component {

    componentDidMount = () => {
        const { match, generateBill } = this.props
        console.log(match)
        generateBill(match.params.id)
    }

    render() {
        const { bill_data, match } = this.props
        console.log(bill_data.data)
        return (
            <div className='container pt-5'>
                <div className='row pt-5 mt-5'>
                    <div className='col-5 offset-3'>
                        <div className="card shadow p-3 mb-5 bg-white rounded" >
                            <h5 className="card-title p-3">{match.params.id}</h5>
                            <table className="table table-dark">
                                <thead>
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col">price</th>
                                        <th scope="col">quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {console.log(bill_data.data)}
                                    {
                                        bill_data.data === undefined ?
                                            <h4>user not defined</h4> :
                                            bill_data.data.map(ele =>

                                                <tr key={uuidv4()}>
                                                    <td>{ele.item}</td>
                                                    <td>{ele.price}</td>
                                                    <td>{ele.quantity}</td>
                                                </tr>
                                            )
                                    }
                                    <tr>
                                        <td>Tax</td>
                                        <td>{bill_data.tax}</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Service Charge</td>
                                        <td>{bill_data.service_charge}</td>
                                        <td></td>
                                    </tr>
                                    {
                                        bill_data.discount === 0 ?
                                            <tr>
                                                <td>Discount</td>
                                                <td>{bill_data.discount}</td>
                                                <td>no discount</td>
                                            </tr> 
                                            :
                                            <tr>
                                                <td>Discount</td>
                                                <td>{bill_data.discount}</td>
                                                <td>10% discount</td>
                                            </tr>
                                    }
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Total</td>
                                        <td>{bill_data.total}</td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isLoading: state.isLoading,
    bill_data: state.bill_data,
    isError: state.isError

})

const mapDispatchToProps = dispatch => ({
    generateBill: payload => dispatch(generateBill(payload))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Bill);