import { call, put, takeLatest } from "redux-saga/effects";
import {actionTypes, reduxUtil } from "../actions/address";

import apiConfig from "../constants/apiConfig";

import { sendRequest } from "../services/apiService";
import { handleApiResponse } from "../utils/apiHelper";
const {defineActionLoading, defineActionSuccess, defineActionFailed} = reduxUtil;

const {
    GET_ADDRESS_LIST,
    DELETE_ADDRESS,
} = actionTypes;

function* getAddressList({ payload: {params} }){
    const apiParams = apiConfig.addressCustomer.getList;
    const searchParams = { page: params.page, size: params.size,customerId:params.customerId };
    if (params.search)
    {
        if (params.search.addressDetails)
            searchParams.addressDetails = params.search.addressDetails;
        if(params.search.receiverFullName)
            searchParams.receiverFullName = params.search.receiverFullName;
    }

    try {
        const result = yield call (sendRequest, apiParams, searchParams);
        yield put ({
            type: defineActionSuccess(GET_ADDRESS_LIST),
            addressData: result.responseData && {
                ...result.responseData.data,
            },
        })
    }
    catch(error) {
        yield put({ type: defineActionFailed(GET_ADDRESS_LIST) });
    }
}

function* getAddress ({payload:{params, onCompleted, onError}})
{
    try {
        //Define which Api and its path
        const apiParams = {
            ...apiConfig.addressCustomer.getById,
            path: `${apiConfig.addressCustomer.getById.path}/${params.id}`
        }
        const result = yield call(sendRequest, apiParams);
        handleApiResponse(result, onCompleted, onError);
    }
    catch(error)
    {
        onError(error);
    }
}

function* createAddress({payload: {params, onCompleted, onError}})
{
    try{
        const result = yield call (sendRequest, apiConfig.addressCustomer.create, params);
        handleApiResponse(result, onCompleted, onError);
    }
    catch(error)
    {
        onError(error);
    }
}

function* updateAddress({payload: {params, onCompleted, onError}})
{
    try{
        const result = yield call (sendRequest, apiConfig.addressCustomer.update, params);
        handleApiResponse(result, onCompleted, onError);
    }
    catch(error)
    {
        onError(error);
    }
}

function* deleteAddress({payload: {params, onCompleted, onError}})
{
    try{
        const apiParams = {
            ...apiConfig.addressCustomer.delete,
            path: `${apiConfig.addressCustomer.delete.path}/${params.id}`
        }
        const result = yield call (sendRequest, apiParams);
        handleApiResponse(result, onCompleted, onError);

        const { success, responseData } = result;
        if(!success || !responseData.result)
            yield put({ type: defineActionFailed(DELETE_ADDRESS) });
    }
    catch(error)
    {
        yield put({ type: defineActionFailed(DELETE_ADDRESS) });
        onError(error);
    }
}

const sagas = [
    takeLatest(defineActionLoading(GET_ADDRESS_LIST), getAddressList),
    takeLatest(actionTypes.GET_ADDRESS_BY_ID, getAddress),
    takeLatest(actionTypes.CREATE_ADDRESS, createAddress),
    takeLatest(actionTypes.UPDATE_ADDRESS, updateAddress),
    takeLatest(defineActionLoading(DELETE_ADDRESS), deleteAddress),
]

export default sagas;