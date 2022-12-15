import { call, put, takeLatest } from "redux-saga/effects";
import {actionTypes, reduxUtil } from "../actions/store";

import apiConfig from "../constants/apiConfig";

import { sendRequest } from "../services/apiService";
import { handleApiResponse } from "../utils/apiHelper";
const {defineActionLoading, defineActionSuccess, defineActionFailed} = reduxUtil;

const {
    GET_STORE_LIST,
    GET_STORE_AUTOCOMPLETE,
    DELETE_STORE,
    
} = actionTypes;

function* getStoreList({ payload: {params} }){
    const apiParams = apiConfig.store.getList;
    const searchParams = { page: params.page, size: params.size };
    if (params.search)
    {
        if (params.search.name)
            searchParams.name = params.search.name;
        if(params.search.addressDetails)
            searchParams.addressDetails = params.search.addressDetails;
    }

    try {
        const result = yield call (sendRequest, apiParams, searchParams);
        yield put ({
            type: defineActionSuccess(GET_STORE_LIST),
            storeListData: result.responseData && {
                ...result.responseData.data,
            },
        })
    }
    catch(error) {
        yield put({ type: defineActionFailed(GET_STORE_LIST) });
    }
}

function* getStoreAutoComplete({ payload: { kind } }){
    const apiParams = apiConfig.store.getStoreAutoCompleted;

    try {
        const result = yield call (sendRequest, apiParams, { kind });
        yield put ({
            type: defineActionSuccess(GET_STORE_AUTOCOMPLETE),
            categoryAutoCompleteStore: result.responseData && {
                ...result.responseData.data,
            },
            
        })
    }
    catch(error) {
        yield put({ type: defineActionFailed(GET_STORE_AUTOCOMPLETE) });
    }
}

function* getStore ({payload:{params, onCompleted, onError}})
{
    try {
        //Define which Api and its path
        const apiParams = {
            ...apiConfig.store.getById,
            path: `${apiConfig.store.getById.path}/${params.id}`
        }
        const result = yield call(sendRequest, apiParams);
        handleApiResponse(result, onCompleted, onError);
    }
    catch(error)
    {
        onError(error);
    }
}

function* createStore({payload: {params, onCompleted, onError}})
{
    try{
        const result = yield call (sendRequest, apiConfig.store.create, params);
        handleApiResponse(result, onCompleted, onError);
    }
    catch(error)
    {
        onError(error);
    }
}

function* updateStore({payload: {params, onCompleted, onError}})
{
    try{
        const result = yield call (sendRequest, apiConfig.store.update, params);
        handleApiResponse(result, onCompleted, onError);
    }
    catch(error)
    {
        onError(error);
    }
}

function* deleteStore({payload: {params, onCompleted, onError}})
{
    try{
        const apiParams = {
            ...apiConfig.store.delete,
            path: `${apiConfig.store.delete.path}/${params.id}`
        }
        const result = yield call (sendRequest, apiParams);
        handleApiResponse(result, onCompleted, onError);

        const { success, responseData } = result;
        if(!success || !responseData.result)
            yield put({ type: defineActionFailed(DELETE_STORE) });
    }
    catch(error)
    {
        yield put({ type: defineActionFailed(DELETE_STORE) });
        onError(error);
    }
}

const sagas = [
    takeLatest(defineActionLoading(GET_STORE_LIST), getStoreList),
    takeLatest(defineActionLoading(GET_STORE_AUTOCOMPLETE), getStoreAutoComplete),
    takeLatest(actionTypes.GET_STORE_BY_ID, getStore),
    takeLatest(actionTypes.CREATE_STORE, createStore),
    takeLatest(actionTypes.UPDATE_STORE, updateStore),
    takeLatest(defineActionLoading(DELETE_STORE), deleteStore),
]

export default sagas;