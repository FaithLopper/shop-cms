import { actionTypes, reduxUtil } from '../actions/address';

const { createReducer, defineActionSuccess, defineActionLoading, defineActionFailed } = reduxUtil;
const {
    GET_ADDRESS_LIST,
    DELETE_ADDRESS,
} = actionTypes;

const initialState = {
    addressData:{},
    addressLoading:false,
};

const reducer = createReducer({
        [defineActionLoading(GET_ADDRESS_LIST)]: (state) => {
            return {
                ...state,
                addressLoading: true
            }
        },
        [defineActionSuccess(GET_ADDRESS_LIST)]: (state, { addressData }) => {
            return {
                ...state,
                addressData,
                addressLoading: false
            }
        },
        [defineActionLoading(DELETE_ADDRESS)] : (state) =>{
            return {
                ...state,
                addressLoading: true,
            }
        },
        [defineActionFailed(DELETE_ADDRESS)] : (state) =>{
            return {
                ...state,
                addressLoading: false,
            }
        },
    },
    initialState
)

export default {
    reducer
};
