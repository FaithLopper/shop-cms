import {actionTypes, reduxUtil} from "../actions/news";


const { createReducer, defineActionSuccess, defineActionLoading, defineActionFailed } = reduxUtil;

const {
    GET_NEWS_LIST,
    GET_CATEGORY_AUTOCOMPLETE_NEWS,
    DELETE_NEWS,
} = actionTypes;

const initialState = {
    newsListData: {},
    newsListLoading: false,
    categoryAutoCompleteNews: {},
}

const reducer = createReducer ({
    [defineActionLoading(GET_NEWS_LIST)] : (state) =>{
        return {
            ...state,
            newsListLoading: true,
        }
    },
    [defineActionSuccess(GET_NEWS_LIST)] : (state, {newsListData} ) =>{
        return {
            ...state,
            newsListData,
            newsListLoading: false,
        }
    },
    [defineActionSuccess(GET_CATEGORY_AUTOCOMPLETE_NEWS)] : (state, {categoryAutoCompleteNews} ) =>{
        return {
            ...state,
            categoryAutoCompleteNews,
        }
    },
    [defineActionLoading(DELETE_NEWS)] : (state) =>{
        return {
            ...state,
            newsListLoading: true,
        }
    },
    [defineActionFailed(DELETE_NEWS)] : (state) =>{
        return {
            ...state,
            newsListLoading: false,
        }
    },
    initialState
})

export default {
    reducer
};