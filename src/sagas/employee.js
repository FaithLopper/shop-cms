import { call, put, takeLatest } from 'redux-saga/effects';

import { sendRequest } from '../services/apiService';
import { actionTypes, reduxUtil } from '../actions/employee';
import apiConfig from '../constants/apiConfig';
import { handleApiResponse } from '../utils/apiHelper';
import { UserTypes } from '../constants';

const { defineActionLoading, defineActionSuccess, defineActionFailed } = reduxUtil;

const {
    GET_USER_EMPLOY_LIST,
    GET_USER_EMPLOY_BY_ID,
    CREATE_USER_EMPLOY,
    UPDATE_USER_EMPLOY,
    DELETE_USER_EMPLOY,
} = actionTypes;


function* getUserEmployList({ payload: { params } }) {

    const apiParams = apiConfig.employee.getList;
    const searchParams = { page: params.page, size: params.size};
    if(params.search) {
        if(params.search.status)
            searchParams.status = params.search.status;
        if(params.search.username) {
            searchParams.username = params.search.username
        }
        if(params.search.fullName) {
            searchParams.fullName = params.search.fullName
        }
    }
    try {
        const result = yield call(sendRequest, apiParams, searchParams);
        yield put({
            type: defineActionSuccess(GET_USER_EMPLOY_LIST),
            userEmployListData: result.responseData && result.responseData.data
        });
    }
    catch(error) {
        yield put({ type: defineActionFailed(GET_USER_EMPLOY_LIST) });
    }
}

function* getUserEmployById({ payload: { params, onCompleted, onError } }) {
    try {
        const apiParams = {
            ...apiConfig.employee.getById,
            path: `${apiConfig.employee.getById.path}/${params.id}`
        }
        const result = yield call(sendRequest, apiParams);
        handleApiResponse(result, onCompleted, onError);
    }
    catch(error) {
        onError(error);
    }
}

function* createUserEmploy({ payload: { params, onCompleted, onError } }) {
    try {
        const apiParams = params.kind === UserTypes.EMPLOYEE ? apiConfig.employee.create : apiConfig.employee.create; // re check
        const result = yield call(sendRequest, apiParams, params);
        handleApiResponse(result, onCompleted, onError);
    }
    catch(error) {
        onError(error);
    }
}

function* updateUserEmploy({ payload: { params, onCompleted, onError } }) {
    try {
        const apiParams = params.kind === UserTypes.EMPLOYEE ? apiConfig.employee.update : apiConfig.employee.update; // re check
        const result = yield call(sendRequest, apiParams, params);
        handleApiResponse(result, onCompleted, onError);
    }
    catch(error) {
        onError(error);
    }
}

function* deleteUserEmployee({ payload: { params, onCompleted, onError } }) {
    try {
        const apiParams = {
            ...apiConfig.employee.delete,
            path: `${apiConfig.employee.delete.path}/${params.id}`
        }
        const result = yield call(sendRequest, apiParams);
        handleApiResponse(result, onCompleted, onError);

        const { success, responseData } = result;
        if(!success || !responseData.result)
            yield put({ type: defineActionFailed(DELETE_USER_EMPLOY) });
    }
    catch(error) {
        yield put({ type: defineActionFailed(DELETE_USER_EMPLOY) });
        onError(error);
    }
}

const sagas = [
    takeLatest(defineActionLoading(GET_USER_EMPLOY_LIST), getUserEmployList),
    takeLatest(GET_USER_EMPLOY_BY_ID, getUserEmployById),
    takeLatest(CREATE_USER_EMPLOY, createUserEmploy),
    takeLatest(UPDATE_USER_EMPLOY, updateUserEmploy),
    takeLatest(defineActionLoading(DELETE_USER_EMPLOY), deleteUserEmployee),
]

export default sagas;