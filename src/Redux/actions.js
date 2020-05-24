import {
    ADD_ITEM_SUCCESS,
    SHOW_ITEM_SUCCESS,
    EDIT_ITEM_SUCCESS,
    GET_ITEM,
    DELETE_SUCCESS,
    BILL_SUCCESS
} from './actionTypes'
import axios from 'axios'

export const addItemSusscess = payload => ({
    type: ADD_ITEM_SUCCESS,
    payload
})

export const addItem = payload => dispatch => {
    console.log(payload)

    axios.post('http://127.0.0.1:5000/', {
        name: payload.name,
        item: payload.item,
        price: payload.price,
        quantity: payload.quantity,
        day: payload.day
    })
        .then(res => res.data)
        .then(res => dispatch(addItemSusscess(res)))
}

////Show List of Items////
export const showItemSuccess = payload => ({
    type: SHOW_ITEM_SUCCESS,
    payload
})

export const showItems = payload => dispatch => {
    console.log(payload)

    axios.post('http://127.0.0.1:5000/orders', {
        user: payload
    })
        .then(res => res.data)
        .then(res => dispatch(showItemSuccess(res)))
}

//////// Edit Item /////////////

export const getItem = payload => ({
    type: GET_ITEM,
    payload
})

export const itemDetails = payload => dispatch => {

    axios.get(`http://127.0.0.1:5000/edit/${payload}`)
        .then(res => res.data)
        .then(res => dispatch(getItem(res)))
}

export const editItemSuccess = payload => ({
    type: EDIT_ITEM_SUCCESS,
    payload
})

export const editItem = payload => dispatch => {
    axios.post(`http://127.0.0.1:5000/edit/${payload.id}`, {
        id: payload.id,
        name: payload.name,
        item: payload.item,
        price: payload.price,
        quantity: payload.quantity,
        day: payload.day
    })
        .then(res => res.data)
        .then(res => dispatch(editItemSuccess(res)))
}

////// Delete Order /////////

export const deleteSuccess = payload => ({
    type: DELETE_SUCCESS,
    payload
})

export const deleteItem = payload => dispatch => {
    axios.delete(`http://127.0.0.1:5000/orders/${payload}`)
        .then(res => console.log(res))
}

//////// Generate Bill ///////////////

export const billSuccess = payload => ({
    type: BILL_SUCCESS,
    payload
})

export const generateBill = payload => dispatch => {
    console.log(payload)

    axios.post('http://127.0.0.1:5000/bill', {
        user: payload
    })
        .then(res => res.data)
        .then(res => dispatch(billSuccess(res)))
}