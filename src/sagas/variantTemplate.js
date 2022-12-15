import { call, put, takeLatest } from "redux-saga/effects";
import {actionTypes, reduxUtil } from "../actions/variantTemplate";

import apiConfig from "../constants/apiConfig";

import { sendRequest } from "../services/apiService";
import { handleApiResponse } from "../utils/apiHelper";
const {defineActionLoading, defineActionSuccess, defineActionFailed} = reduxUtil;

const {
    GET_VARIANT_TEMPLATE_LIST,
    GET_VARIANT_TEMPLATE_AUTOCOMPLETE,
    DELETE_VARIANT_TEMPLATE,
} = actionTypes;

function* getVariantTemplateList({ payload: {params} }){
    const apiParams = apiConfig.variantTemplate.getList;
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
            type: defineActionSuccess(GET_VARIANT_TEMPLATE_LIST),
            variantTemplateListData: result.responseData && {
                ...result.responseData.data,
            },
        })
    }
    catch(error) {
        yield put({ type: defineActionFailed(GET_VARIANT_TEMPLATE_LIST) });
    }
}

function* getVariantTemplateAutoComplete({ payload: { kind } }){
    const apiParams = apiConfig.variantTemplate.getVariantTemplateAutoCompleted;

    try {
        const result = yield call (sendRequest, apiParams, { kind });
        yield put ({
            type: defineActionSuccess(GET_VARIANT_TEMPLATE_AUTOCOMPLETE),
            variantTemplateAutoComplete: result.responseData && {
                ...result.responseData.data,
            },
            
        })
    }
    catch(error) {
        yield put({ type: defineActionFailed(GET_VARIANT_TEMPLATE_AUTOCOMPLETE) });
    }
}

function* getVariantTemplate ({payload:{params, onCompleted, onError}})
{
    try {
        //Define which Api and its path
        const apiParams = {
            ...apiConfig.variantTemplate.getById,
            path: `${apiConfig.variantTemplate.getById.path}/${params.id}`
        }
        const result = yield call(sendRequest, apiParams);
        handleApiResponse(result, onCompleted, onError);
    }
    catch(error)
    {
        onError(error);
    }
}

function* createVariantTemplate({payload: {params, onCompleted, onError}})
{
    try{
        const result = yield call (sendRequest, apiConfig.variantTemplate.create, params);
        handleApiResponse(result, onCompleted, onError);
    }
    catch(error)
    {
        onError(error);
    }
}

function* getVariantTemplateModal({payload: {params, onCompleted, onError}})
{
    try{
        const result = yield call (sendRequest, apiConfig.variantTemplate.getList, params);
        handleApiResponse(result, onCompleted, onError);
    }
    catch(error)
    {
        onError(error);
    }
}

function* updateVariantTemplate({payload: {params, onCompleted, onError}})
{
    try{
        const result = yield call (sendRequest, apiConfig.variantTemplate.update, params);
        handleApiResponse(result, onCompleted, onError);
    }
    catch(error)
    {
        onError(error);
    }
}

function* deleteVariantTemplate({payload: {params, onCompleted, onError}})
{
    try{
        const apiParams = {
            ...apiConfig.variantTemplate.delete,
            path: `${apiConfig.variantTemplate.delete.path}/${params.id}`
        }
        const result = yield call (sendRequest, apiParams);
        handleApiResponse(result, onCompleted, onError);

        const { success, responseData } = result;
        if(!success || !responseData.result)
            yield put({ type: defineActionFailed(DELETE_VARIANT_TEMPLATE) });
    }
    catch(error)
    {
        yield put({ type: defineActionFailed(DELETE_VARIANT_TEMPLATE) });
        onError(error);
    }
}

const sagas = [
    takeLatest(defineActionLoading(GET_VARIANT_TEMPLATE_LIST), getVariantTemplateList),
    takeLatest(defineActionLoading(GET_VARIANT_TEMPLATE_AUTOCOMPLETE), getVariantTemplateAutoComplete),
    takeLatest(actionTypes.GET_VARIANT_TEMPLATE_BY_ID, getVariantTemplate),
    takeLatest(actionTypes.CREATE_VARIANT_TEMPLATE, createVariantTemplate),
    takeLatest(actionTypes.GET_VARIANT_TEMPLATE_LIST_MODAL, getVariantTemplateModal),
    takeLatest(actionTypes.UPDATE_VARIANT_TEMPLATE, updateVariantTemplate),
    takeLatest(defineActionLoading(DELETE_VARIANT_TEMPLATE), deleteVariantTemplate),
]

export default sagas;