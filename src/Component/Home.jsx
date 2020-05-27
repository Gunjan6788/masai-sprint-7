import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addItem } from '../Redux/actions'
import { Link } from 'react-router-dom'

class AddOrder extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            item: '',
            price: '',
            quantity: '',
            day: '',

        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        const { add, addItem } = this.props

        return (
            <>
                <div className="container">
                    <h3 className="text-center m-3">Enter Item</h3>

                    <div className="border row offset-3 col-md-6 p-3 bg-dark text-light rounded">
                        <div className='col-12'>
                            <div className="form-group col-12">
                                <label>Name</label>
                                <input className="form-control"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.handleChange} />
                            </div>
                            <div className="form-group col-12">
                                <label>Item Name</label>
                                <input className="form-control"
                                    name="item"
                                    value={this.state.item}
                                    onChange={this.handleChange} />
                            </div>
                            <div className="form-group col-12">
                                <label>Price</label>
                                <input className="form-control"
                                    name="price"
                                    value={this.state.price}
                                    onChange={this.handleChange} />
                            </div>
                            <div className="form-group col-12">
                                <label>Quantity</label>
                                <input className="form-control"
                                    name="quantity"
                                    value={this.state.quantity}
                                    onChange={this.handleChange} />
                            </div>
                            <div className="form-group col-md-4">
                                <label >Day</label>
                                <select className="form-control"
                                    name="day"
                                    value={this.state.day}
                                    onChange={this.handleChange}
                                >
                                    <option >Choose day</option>
                                    <option value="Mon">Monday</option>
                                    <option value="Tues">Tuesday</option>
                                    <option value="Wed">Wednesday</option>
                                    <option value="Thurs">Thursday</option>
                                    <option value="Fri">Friday</option>
                                    <option value="Sat">Saturday</option>
                                    <option value="Sun">Sunday</option>

                                </select>
                            </div>
                        </div>

                        <button className="btn btn-info ml-5 mt-3"
                            onClick={(e) => {
                                e.preventDefault()
                                addItem(this.state)
                            }}
                        >
                            Add Details
                        </button>
                    </div>
                    <p className="text-center lead m-3">{add.message}</p>
                    <p className="text-center">
                        <Link to="/orders"><button className='btn btn-info m-3'>View Order Details</button></Link>
                    </p>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => ({
    add: state.add,
});

const mapDispatchToProps = dispatch => ({
    addItem: payload => dispatch(addItem(payload))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddOrder);