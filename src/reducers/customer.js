import { actionTypes, reduxUtil } from '../actions/customer';

const { createReducer, defineActionSuccess, defineActionLoading, defineActionFailed } = reduxUtil;
const {
    GET_CUSTOMER_LIST,
    DELETE_CUSTOMER,
    GET_CUSTOMER_AUTO_COMPLETE
} = actionTypes;

const initialState = {
    customerData:{},
    customerLoading:false,
    customerAutoCompleteData:{},
};

const reducer = createReducer({
        [defineActionLoading(GET_CUSTOMER_LIST)]: (state) => {
            return {
                ...state,
                customerLoading: true
            }
        },
        [defineActionSuccess(GET_CUSTOMER_LIST)]: (state, { customerData }) => {
            return {
                ...state,
                customerData,
                customerLoading: false
            }
        },
        [defineActionLoading(DELETE_CUSTOMER)] : (state) =>{
            return {
                ...state,
                customerLoading: true,
            }
        },
        [defineActionFailed(DELETE_CUSTOMER)] : (state) =>{
            return {
                ...state,
                customerLoading: false,
            }
        },
        [defineActionSuccess(GET_CUSTOMER_AUTO_COMPLETE)] : (state, {customerAutoCompleteData} ) =>{
            return {
                ...state,
                customerAutoCompleteData,
            }
        },
    },
    initialState
)

export default {
    reducer
};
