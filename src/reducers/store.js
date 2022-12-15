import {actionTypes, reduxUtil} from "../actions/store";


const { createReducer, defineActionSuccess, defineActionLoading, defineActionFailed } = reduxUtil;

const {
    GET_STORE_LIST,
    GET_STORE_AUTOCOMPLETE,
    DELETE_STORE,
} = actionTypes;

const initialState = {
    storeListData: {},
    storeListLoading: false,
    categoryAutoCompleteStore: {},
}

const reducer = createReducer ({
    [defineActionLoading(GET_STORE_LIST)] : (state) =>{
        return {
            ...state,
            storeListLoading: true,
        }
    },
    [defineActionSuccess(GET_STORE_LIST)] : (state, {storeListData} ) =>{
        return {
            ...state,
            storeListData,
            storeListLoading: false,
        }
    },
    [defineActionSuccess(GET_STORE_AUTOCOMPLETE)] : (state, {categoryAutoCompleteStore} ) =>{
        return {
            ...state,
            categoryAutoCompleteStore,
        }
    },
    [defineActionLoading(DELETE_STORE)] : (state) =>{
        return {
            ...state,
            storeListLoading: true,
        }
    },
    [defineActionFailed(DELETE_STORE)] : (state) =>{
        return {
            ...state,
            storeListLoading: false,
        }
    },
    initialState
})

export default {
    reducer
};