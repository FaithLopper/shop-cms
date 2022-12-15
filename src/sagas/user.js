import { call, put, takeLatest } from 'redux-saga/effects';

import { sendRequest } from '../services/apiService';
import { actionTypes, reduxUtil } from '../actions/user';
import apiConfig from '../constants/apiConfig';
import { handleApiResponse } from '../utils/apiHelper';
import { UserTypes } from '../constants';

const { defineActionLoading, defineActionSuccess, defineActionFailed } = reduxUtil;

const {
    GET_USER_ADMIN_LIST,
    GET_USER_BY_ID,
    CREATE_USER,
    UPDATE_USER,
    DELETE_ADMIN,
} = actionTypes;


function* getUserAdminList({ payload: { params } }) {

    const apiParams = apiConfig.user.getAdminList;
    const searchParams = { page: params.page, size: params.size , kind: UserTypes.ADMIN};
    if(params.search) {
        if(params.search.status)
            searchParams.status = params.search.status;
        if(params.search.username) {
            searchParams.username = params.search.username
        }
        if(params.search.fullName) {
            searchParams.fullName = params.search.fullName
        }
        if(params.search.organizeId) {
            searchParams.organizeId = params.search.organizeId
        }
    }
    try {
        const result = yield call(sendRequest, apiParams, searchParams);
        yield put({
            type: defineActionSuccess(GET_USER_ADMIN_LIST),
            userAdminData: result.responseData && result.responseData.data
        });
    }
    catch(error) {
        yield put({ type: defineActionFailed(GET_USER_ADMIN_LIST) });
    }
}

function* getAdminById({ payload: { params, onCompleted, onError } }) {
    try {
        const apiParams = {
            ...apiConfig.user.getAdminById,
            path: `${apiConfig.user.getAdminById.path}/${params.id}`
        }
        const result = yield call(sendRequest, apiParams);
        handleApiResponse(result, onCompleted, onError);
    }
    catch(error) {
        onError(error);
    }
}

function* createUser({ payload: { params, onCompleted, onError } }) {

    try {
        const apiParams = params.kind === UserTypes.ADMIN ? apiConfig.user.createAdmin : apiConfig.user.createShopAccount;
        const result = yield call(sendRequest, apiParams, params);
        handleApiResponse(result, onCompleted, onError);
    }
    catch(error) {
        onError(error);
    }
}

function* updateUser({ payload: { params, onCompleted, onError } }) {
    try {
        const apiParams = params.kind === UserTypes.ADMIN ? apiConfig.user.updateAdmin : apiConfig.user.updateShopAccount;
        const result = yield call(sendRequest, apiParams, params);
        handleApiResponse(result, onCompleted, onError);
    }
    catch(error) {
        onError(error);
    }
}

function* deleteAdmin({ payload: { params, onCompleted, onError } }) {
    try {
        const apiParams = {
            ...apiConfig.user.deleteAdmin,
            path: `${apiConfig.user.deleteAdmin.path}/${params.id}`
        }
        const result = yield call(sendRequest, apiParams);
        handleApiResponse(result, onCompleted, onError);

        const { success, responseData } = result;
        if(!success || !responseData.result)
            yield put({ type: defineActionFailed(DELETE_ADMIN) });
    }
    catch(error) {
        yield put({ type: defineActionFailed(DELETE_ADMIN) });
        onError(error);
    }
}

const sagas = [
    takeLatest(defineActionLoading(GET_USER_ADMIN_LIST), getUserAdminList),
    takeLatest(GET_USER_BY_ID, getAdminById),
    takeLatest(CREATE_USER, createUser),
    takeLatest(UPDATE_USER, updateUser),
    takeLatest(defineActionLoading(DELETE_ADMIN), deleteAdmin),
]

export default sagas;