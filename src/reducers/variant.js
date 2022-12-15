import {actionTypes, reduxUtil} from "../actions/variant";


const { createReducer, defineActionSuccess, defineActionLoading, defineActionFailed } = reduxUtil;

const {
    GET_VARIANT_LIST,
    GET_VARIANT_AUTOCOMPLETE,
    DELETE_VARIANT,
} = actionTypes;

const initialState = {
    variantListData: {},
    variantListLoading: false,
    variantAutoComplete: {},
}

const reducer = createReducer ({
    [defineActionLoading(GET_VARIANT_LIST)] : (state) =>{
        return {
            ...state,
            variantListLoading: true,
        }
    },
    [defineActionSuccess(GET_VARIANT_LIST)] : (state, {variantListData} ) =>{
        return {
            ...state,
            variantListData,
            variantListLoading: false,
        }
    },
    [defineActionSuccess(GET_VARIANT_AUTOCOMPLETE)] : (state, {variantAutoComplete} ) =>{
        return {
            ...state,
            variantAutoComplete,
        }
    },
    [defineActionLoading(DELETE_VARIANT)] : (state) =>{
        return {
            ...state,
            variantListLoading: true,
        }
    },
    [defineActionFailed(DELETE_VARIANT)] : (state) =>{
        return {
            ...state,
            variantListLoading: false,
        }
    },
    initialState
})

export default {
    reducer
};