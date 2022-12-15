import { call, put, takeLatest } from "redux-saga/effects";
import {actionTypes, reduxUtil } from "../actions/news";

import apiConfig from "../constants/apiConfig";

import { sendRequest } from "../services/apiService";
import { handleApiResponse } from "../utils/apiHelper";
const {defineActionLoading, defineActionSuccess, defineActionFailed} = reduxUtil;

const {
    GET_NEWS_LIST,
    GET_CATEGORY_AUTOCOMPLETE_NEWS,
    DELETE_NEWS,
    
} = actionTypes;

function* getNewsList({ payload: {params} }){
    const apiParams = apiConfig.news.getList;
    const searchParams = { page: params.page, size: params.size };
    searchParams.kind = params.kind;
    if (params.search)
    {
        if (params.search.title)
            searchParams.title = params.search.title;
        if(params.search.status)
            searchParams.status = params.search.status;
        if(params.search.categoryId)
            searchParams.categoryId = params.search.categoryId;
    }

    try {
        const result = yield call (sendRequest, apiParams, searchParams);
        yield put ({
            type: defineActionSuccess(GET_NEWS_LIST),
            newsListData: result.responseData && {
                ...result.responseData.data,
            },
        })
    }
    catch(error) {
        yield put({ type: defineActionFailed(GET_NEWS_LIST) });
    }
}

function* getCategoryAutoCompleteNews({ payload: { kind } }){
    const apiParams = apiConfig.news.categoryAutoComplete;

    try {
        const result = yield call (sendRequest, apiParams, { kind });
        yield put ({
            type: defineActionSuccess(GET_CATEGORY_AUTOCOMPLETE_NEWS),
            categoryAutoCompleteNews: result.responseData && {
                ...result.responseData.data,
            },
            
        })
    }
    catch(error) {
        yield put({ type: defineActionFailed(GET_CATEGORY_AUTOCOMPLETE_NEWS) });
    }
}

function* getNews ({payload:{params, onCompleted, onError}})
{
    try {
        //Define which Api and its path
        const apiParams = {
            ...apiConfig.news.getById,
            path: `${apiConfig.news.getById.path}/${params.id}`
        }
        const result = yield call(sendRequest, apiParams);
        handleApiResponse(result, onCompleted, onError);
    }
    catch(error)
    {
        onError(error);
    }
}

function* createNews({payload: {params, onCompleted, onError}})
{
    try{
        const result = yield call (sendRequest, apiConfig.news.create, params);
        handleApiResponse(result, onCompleted, onError);
    }
    catch(error)
    {
        onError(error);
    }
}

function* updateNews({payload: {params, onCompleted, onError}})
{
    try{
        const result = yield call (sendRequest, apiConfig.news.update, params);
        handleApiResponse(result, onCompleted, onError);
    }
    catch(error)
    {
        onError(error);
    }
}

function* deleteNews({payload: {params, onCompleted, onError}})
{
    try{
        const apiParams = {
            ...apiConfig.news.delete,
            path: `${apiConfig.news.delete.path}/${params.id}`
        }
        const result = yield call (sendRequest, apiParams);
        handleApiResponse(result, onCompleted, onError);

        const { success, responseData } = result;
        if(!success || !responseData.result)
            yield put({ type: defineActionFailed(DELETE_NEWS) });
    }
    catch(error)
    {
        yield put({ type: defineActionFailed(DELETE_NEWS) });
        onError(error);
    }
}

const sagas = [
    takeLatest(defineActionLoading(GET_NEWS_LIST), getNewsList),
    takeLatest(defineActionLoading(GET_CATEGORY_AUTOCOMPLETE_NEWS), getCategoryAutoCompleteNews),
    takeLatest(actionTypes.GET_NEWS_BY_ID, getNews),
    takeLatest(actionTypes.CREATE_NEWS, createNews),
    takeLatest(actionTypes.UPDATE_NEWS, updateNews),
    takeLatest(defineActionLoading(DELETE_NEWS), deleteNews),
]

export default sagas;