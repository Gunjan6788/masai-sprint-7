import React, { Component } from 'react'
import { connect } from 'react-redux'
import { showItems, deleteItem } from '../Redux/actions'
import { Link } from 'react-router-dom'
import uuidv4 from 'uuid'

class Orders extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: ''
        }
    }

    handleDelete = (id) => {
        const { deleteItem, showItems } = this.props
        deleteItem(id)
        showItems(this.state.user)
    }

    render() {
        const { data, showItems } = this.props
        console.log(data)
        return (
            <div className="container">
                <p className="m-3">Enter the user name to view orders</p>
                <div className="form-group col-3">
                    <label>Name</label>
                    <input className="form-control"
                        value={this.state.user}
                        onChange={(e) => this.setState({ user: e.target.value })} />
                    <button className="btn btn-info m-2"
                        onClick={() => {
                            showItems(this.state.user)
                        }}>
                        Search
                    </button>
                    <Link to={`/bill/${this.state.user}`}><button className="btn btn-info">Get Bill</button></Link>
                </div>

                <h3 className="text-center m-3">User Details</h3>

                <table className="table table-dark">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Item</th>
                            <th scope="col">Price</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Day</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data && data.map(ele =>

                                <tr key={uuidv4()}>
                                    <td scope="row">{ele.name}</td>
                                    <td>{ele.item}</td>
                                    <td>{ele.price}</td>
                                    <td>{ele.quantity}</td>
                                    <td>{ele.day}</td>
                                    <td onClick={() => this.handleDelete(ele.id)}>Delete</td>
                                    <td><Link to={`/edit/${ele.id}`}>Edit</Link></td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    data: state.data
})

const mapDispatchToProps = dispatch => ({
    showItems: payload => dispatch(showItems(payload)),
    deleteItem: payload => dispatch(deleteItem(payload))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Orders);
