import {actionTypes, reduxUtil} from "../actions/variantTemplate";


const { createReducer, defineActionSuccess, defineActionLoading, defineActionFailed } = reduxUtil;

const {
    GET_VARIANT_TEMPLATE_LIST,
    GET_VARIANT_TEMPLATE_AUTOCOMPLETE,
    DELETE_VARIANT_TEMPLATE,
} = actionTypes;

const initialState = {
    variantTemplateListData: {},
    variantTemplateListLoading: false,
    variantTemplateAutoComplete: {},
}

const reducer = createReducer ({
    [defineActionLoading(GET_VARIANT_TEMPLATE_LIST)] : (state) =>{
        return {
            ...state,
            variantTemplateListLoading: true,
        }
    },
    [defineActionSuccess(GET_VARIANT_TEMPLATE_LIST)] : (state, {variantTemplateListData} ) =>{
        return {
            ...state,
            variantTemplateListData,
            variantTemplateListLoading: false,
        }
    },
    [defineActionSuccess(GET_VARIANT_TEMPLATE_AUTOCOMPLETE)] : (state, {variantTemplateAutoComplete} ) =>{
        return {
            ...state,
            variantTemplateAutoComplete,
        }
    },
    [defineActionLoading(DELETE_VARIANT_TEMPLATE)] : (state) =>{
        return {
            ...state,
            variantTemplateListLoading: true,
        }
    },
    [defineActionFailed(DELETE_VARIANT_TEMPLATE)] : (state) =>{
        return {
            ...state,
            variantTemplateListLoading: false,
        }
    },
    initialState
})

export default {
    reducer
};