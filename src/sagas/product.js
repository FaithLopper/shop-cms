import { call, put, takeLatest } from "redux-saga/effects";
import {actionTypes, reduxUtil } from "../actions/product";

import apiConfig from "../constants/apiConfig";

import { sendRequest } from "../services/apiService";
import { handleApiResponse } from "../utils/apiHelper";
const {defineActionLoading, defineActionSuccess, defineActionFailed} = reduxUtil;

const {
    GET_PRODUCT_AUTOCOMPLETE,
    GET_PRODUCT_LIST,
    DELETE_PRODUCT,
} = actionTypes;

function* getProductList({ payload: {params} }){
    const apiParams = apiConfig.product.getList;
    const searchParams = { page: params.page, size: params.size };
    if (params.search)
    {
        if (params.search.name)
            searchParams.name = params.search.name;
        if(params.search.parentProduct)
            searchParams.parentProduct = params.search.parentProduct;
    }

    try {
        const result = yield call (sendRequest, apiParams, searchParams);
        yield put ({
            type: defineActionSuccess(GET_PRODUCT_LIST),
            productListData: result.responseData && {
                ...result.responseData.data,
            },
        })
    }
    catch(error) {
        yield put({ type: defineActionFailed(GET_PRODUCT_LIST) });
    }
}

function* getProductAutoComplete({ payload: { kind } }){
    const apiParams = apiConfig.product.getProductAutoCompleted;

    try {
        const result = yield call (sendRequest, apiParams, { kind });
        yield put ({
            type: defineActionSuccess(GET_PRODUCT_AUTOCOMPLETE),
            productAutoComplete: result.responseData && {
                ...result.responseData.data,
            },
            
        })
    }
    catch(error) {
        yield put({ type: defineActionFailed(GET_PRODUCT_AUTOCOMPLETE) });
    }
}

function* getProduct ({payload:{params, onCompleted, onError}})
{
    try {
        //Define which Api and its path
        const apiParams = {
            ...apiConfig.product.getById,
            path: `${apiConfig.product.getById.path}/${params.id}`
        }
        const result = yield call(sendRequest, apiParams);
        handleApiResponse(result, onCompleted, onError);
    }
    catch(error)
    {
        onError(error);
    }
}

function* createProduct({payload: {params, onCompleted, onError}})
{
    try{
        const result = yield call (sendRequest, apiConfig.product.create, params);
        handleApiResponse(result, onCompleted, onError);
    }
    catch(error)
    {
        onError(error);
    }
}

function* updateProduct({payload: {params, onCompleted, onError}})
{
    try{
        const result = yield call (sendRequest, apiConfig.product.update, params);
        handleApiResponse(result, onCompleted, onError);
    }
    catch(error)
    {
        onError(error);
    }
}

function* deleteProduct({payload: {params, onCompleted, onError}})
{
    try{
        const apiParams = {
            ...apiConfig.product.delete,
            path: `${apiConfig.product.delete.path}/${params.id}`
        }
        const result = yield call (sendRequest, apiParams);
        handleApiResponse(result, onCompleted, onError);

        const { success, responseData } = result;
        if(!success || !responseData.result)
            yield put({ type: defineActionFailed(DELETE_PRODUCT) });
    }
    catch(error)
    {
        yield put({ type: defineActionFailed(DELETE_PRODUCT) });
        onError(error);
    }
}

const sagas = [
    takeLatest(defineActionLoading(GET_PRODUCT_LIST), getProductList),
    takeLatest(defineActionLoading(GET_PRODUCT_AUTOCOMPLETE), getProductAutoComplete),
    takeLatest(actionTypes.GET_PRODUCT_BY_ID, getProduct),
    takeLatest(actionTypes.CREATE_PRODUCT, createProduct),
    takeLatest(actionTypes.UPDATE_PRODUCT, updateProduct),
    takeLatest(defineActionLoading(DELETE_PRODUCT), deleteProduct),
]

export default sagas;