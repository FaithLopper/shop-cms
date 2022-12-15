import { call, put, takeLatest } from "redux-saga/effects";
import {actionTypes, reduxUtil } from "../actions/customer";

import apiConfig from "../constants/apiConfig";

import { sendRequest } from "../services/apiService";
import { handleApiResponse } from "../utils/apiHelper";
const {defineActionLoading, defineActionSuccess, defineActionFailed} = reduxUtil;

const {
    GET_CUSTOMER_LIST,
    GET_CUSTOMER_AUTO_COMPLETE,
    DELETE_CUSTOMER,
    
} = actionTypes;

function* getCustomerList({ payload: {params} }){
    const apiParams = apiConfig.customer.getList;
    const searchParams = { page: params.page, size: params.size };
    if (params.search)
    {
        if (params.search.username)
            searchParams.username = params.search.username;
        if(params.search.fullName)
            searchParams.fullName = params.search.fullName;
        if(params.search.status)
            searchParams.status = params.search.status;
    }

    try {
        const result = yield call (sendRequest, apiParams, searchParams);
        yield put ({
            type: defineActionSuccess(GET_CUSTOMER_LIST),
            customerData: result.responseData && {
                ...result.responseData.data,
            },
        })
    }
    catch(error) {
        yield put({ type: defineActionFailed(GET_CUSTOMER_LIST) });
    }
}

function* getCustomerAutoComplete({ payload: { kind } }){
    const apiParams = apiConfig.customer.customerAutoComplete;

    try {
        const result = yield call (sendRequest, apiParams, { kind });
        yield put ({
            type: defineActionSuccess(GET_CUSTOMER_AUTO_COMPLETE),
            customerAutoCompleteData: result.responseData && {
                ...result.responseData.data,
            },
            
        })
    }
    catch(error) {
        yield put({ type: defineActionFailed(GET_CUSTOMER_AUTO_COMPLETE) });
    }
}

function* getCustomer ({payload:{params, onCompleted, onError}})
{
    try {
        //Define which Api and its path
        const apiParams = {
            ...apiConfig.customer.getById,
            path: `${apiConfig.customer.getById.path}/${params.id}`
        }
        const result = yield call(sendRequest, apiParams);
        handleApiResponse(result, onCompleted, onError);
    }
    catch(error)
    {
        onError(error);
    }
}

function* createCustomer({payload: {params, onCompleted, onError}})
{
    try{
        const result = yield call (sendRequest, apiConfig.customer.create, params);
        handleApiResponse(result, onCompleted, onError);
    }
    catch(error)
    {
        onError(error);
    }
}

function* updateCustomer({payload: {params, onCompleted, onError}})
{
    try{
        const result = yield call (sendRequest, apiConfig.customer.update, params);
        handleApiResponse(result, onCompleted, onError);
    }
    catch(error)
    {
        onError(error);
    }
}

function* deleteCustomer({payload: {params, onCompleted, onError}})
{
    try{
        const apiParams = {
            ...apiConfig.customer.delete,
            path: `${apiConfig.customer.delete.path}/${params.id}`
        }
        const result = yield call (sendRequest, apiParams);
        handleApiResponse(result, onCompleted, onError);

        const { success, responseData } = result;
        if(!success || !responseData.result)
            yield put({ type: defineActionFailed(DELETE_CUSTOMER) });
    }
    catch(error)
    {
        yield put({ type: defineActionFailed(DELETE_CUSTOMER) });
        onError(error);
    }
}

const sagas = [
    takeLatest(defineActionLoading(GET_CUSTOMER_LIST), getCustomerList),
    takeLatest(defineActionLoading(GET_CUSTOMER_AUTO_COMPLETE), getCustomerAutoComplete),
    takeLatest(actionTypes.GET_CUSTOMER_BY_ID, getCustomer),
    takeLatest(actionTypes.CREATE_CUSTOMER, createCustomer),
    takeLatest(actionTypes.UPDATE_CUSTOMER, updateCustomer),
    takeLatest(defineActionLoading(DELETE_CUSTOMER), deleteCustomer),
]

export default sagas;