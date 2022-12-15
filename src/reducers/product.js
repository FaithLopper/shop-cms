import {actionTypes, reduxUtil} from "../actions/product";


const { createReducer, defineActionSuccess, defineActionLoading, defineActionFailed } = reduxUtil;

const {
    GET_PRODUCT_LIST,
    GET_PRODUCT_AUTOCOMPLETE,
    DELETE_PRODUCT,
} = actionTypes;

const initialState = {
    productListData: {},
    productListLoading: false,
    productAutoComplete: {},
}

const reducer = createReducer ({
    [defineActionLoading(GET_PRODUCT_LIST)] : (state) =>{
        return {
            ...state,
            productListLoading: true,
        }
    },
    [defineActionSuccess(GET_PRODUCT_LIST)] : (state, {productListData} ) =>{
        return {
            ...state,
            productListData,
            productListLoading: false,
        }
    },
    [defineActionSuccess(GET_PRODUCT_AUTOCOMPLETE)] : (state, {productAutoComplete} ) =>{
        return {
            ...state,
            productAutoComplete,
        }
    },
    [defineActionLoading(DELETE_PRODUCT)] : (state) =>{
        return {
            ...state,
            productListLoading: true,
        }
    },
    [defineActionFailed(DELETE_PRODUCT)] : (state) =>{
        return {
            ...state,
            productListLoading: false,
        }
    },
    initialState
})

export default {
    reducer
};