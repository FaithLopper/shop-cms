import { call, put, takeLatest } from "redux-saga/effects";
import {actionTypes, reduxUtil } from "../actions/variant";

import apiConfig from "../constants/apiConfig";

import { sendRequest } from "../services/apiService";
import { handleApiResponse } from "../utils/apiHelper";
const {defineActionLoading, defineActionSuccess, defineActionFailed} = reduxUtil;

const {
    GET_VARIANT_LIST,
    GET_VARIANT_AUTOCOMPLETE,
    DELETE_VARIANT,
} = actionTypes;

function* getVariantList({ payload: {params} }){
    const apiParams = apiConfig.variant.getList;
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
            type: defineActionSuccess(GET_VARIANT_LIST),
            variantListData: result.responseData && {
                ...result.responseData.data,
            },
        })
    }
    catch(error) {
        yield put({ type: defineActionFailed(GET_VARIANT_LIST) });
    }
}

function* getVariantAutoComplete({ payload: { kind } }){
    const apiParams = apiConfig.variant.getVariantAutoCompleted;

    try {
        const result = yield call (sendRequest, apiParams, { kind });
        yield put ({
            type: defineActionSuccess(GET_VARIANT_AUTOCOMPLETE),
            variantAutoComplete: result.responseData && {
                ...result.responseData.data,
            },
            
        })
    }
    catch(error) {
        yield put({ type: defineActionFailed(GET_VARIANT_AUTOCOMPLETE) });
    }
}

function* getVariant ({payload:{params, onCompleted, onError}})
{
    try {
        //Define which Api and its path
        const apiParams = {
            ...apiConfig.variant.getById,
            path: `${apiConfig.variant.getById.path}/${params.id}`
        }
        const result = yield call(sendRequest, apiParams);
        handleApiResponse(result, onCompleted, onError);
    }
    catch(error)
    {
        onError(error);
    }
}

function* createVariant({payload: {params, onCompleted, onError}})
{
    try{
        const result = yield call (sendRequest, apiConfig.variant.create, params);
        handleApiResponse(result, onCompleted, onError);
    }
    catch(error)
    {
        onError(error);
    }
}

function* getVariantListModal({payload: {params, onCompleted, onError}})
{
    try{
        const result = yield call (sendRequest, apiConfig.variant.getList, params);
        handleApiResponse(result, onCompleted, onError);
    }
    catch(error)
    {
        onError(error);
    }
}

function* updateVariant({payload: {params, onCompleted, onError}})
{
    try{
        const result = yield call (sendRequest, apiConfig.variant.update, params);
        handleApiResponse(result, onCompleted, onError);
    }
    catch(error)
    {
        onError(error);
    }
}

function* deleteVariant({payload: {params, onCompleted, onError}})
{
    try{
        const apiParams = {
            ...apiConfig.variant.delete,
            path: `${apiConfig.variant.delete.path}/${params.id}`
        }
        const result = yield call (sendRequest, apiParams);
        handleApiResponse(result, onCompleted, onError);

        const { success, responseData } = result;
        if(!success || !responseData.result)
            yield put({ type: defineActionFailed(DELETE_VARIANT) });
    }
    catch(error)
    {
        yield put({ type: defineActionFailed(DELETE_VARIANT) });
        onError(error);
    }
}

const sagas = [
    takeLatest(defineActionLoading(GET_VARIANT_LIST), getVariantList),
    takeLatest(defineActionLoading(GET_VARIANT_AUTOCOMPLETE), getVariantAutoComplete),
    takeLatest(actionTypes.GET_VARIANT_BY_ID, getVariant),
    takeLatest(actionTypes.CREATE_VARIANT, createVariant),
    takeLatest(actionTypes.GET_VARIANT_LIST_MODAL, getVariantListModal),
    takeLatest(actionTypes.UPDATE_VARIANT, updateVariant),
    takeLatest(defineActionLoading(DELETE_VARIANT), deleteVariant),
]

export default sagas;