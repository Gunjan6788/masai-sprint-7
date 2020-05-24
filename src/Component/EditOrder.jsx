import React, { Component } from 'react'
import { connect } from 'react-redux'
import { itemDetails, editItem } from '../Redux/actions'

class EditOrder extends Component {
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

    componentDidMount = () => {
        const { match, itemDetails } = this.props
        itemDetails(match.params.id)
    }

    handleClick = (e) => {
        e.preventDefault()
        const { add, editItem, history, match } = this.props
        editItem({
            id: add.id,
            name: this.state.name,
            item: this.state.item,
            price: this.state.price,
            quantity: this.state.quantity,
            day: this.state.day
        })
        itemDetails(match.params.id)

        history.goBack()
    }

    render() {
        const { add, msg } = this.props
        console.log(msg)
        return (
            <>
                <div className="container"
                    onMouseEnter={() => this.setState({
                        name: add.name,
                        item: add.item,
                        price: add.price,
                        quantity: add.quantity,
                        day: add.day
                    })}>

                    <h3 className="text-center m-3">Enter Item</h3>

                    <div className="border row offset-3 col-md-6 p-3 bg-dark text-light">
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
                            onClick={this.handleClick}
                        >
                            Add Details
                        </button>
                    </div>
                    <p className="text-center lead m-3">{msg}</p>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => ({
    add: state.add,
    msg: state.msg
});

const mapDispatchToProps = dispatch => ({
    itemDetails: payload => dispatch(itemDetails(payload)),
    editItem: payload => dispatch(editItem(payload))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditOrder);