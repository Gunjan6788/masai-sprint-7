import {
    ADD_ITEM_SUCCESS,
    SHOW_ITEM_SUCCESS,
    EDIT_ITEM_SUCCESS,
    GET_ITEM,
    BILL_SUCCESS
} from './actionTypes'

export const initState = {
    add: [],
    data: [],
    msg:''
}

export default (state = initState, { type, payload }) => {
    console.log(payload)
    switch (type) {
        case ADD_ITEM_SUCCESS:
            return {
                ...state,
                add: payload
            }

        case SHOW_ITEM_SUCCESS:
            return {
                ...state,
                data: payload.data
            }

        case GET_ITEM:
            return{
                ...state,
                add:payload
            }

        case EDIT_ITEM_SUCCESS:
            alert(payload.message)
            return{
                ...state,
                msg:payload
            }
        
        case BILL_SUCCESS:
            const item = payload.data 
            return{
                ...state,
                add:item,
                data:payload,
            }
        default:
            return state
    }
}