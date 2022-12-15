import { call, put, takeLatest } from 'redux-saga/effects';

import { sendRequest } from '../services/apiService';
import { actionTypes, reduxUtil } from '../actions/ranks';
import apiConfig from '../constants/apiConfig';
import { handleApiResponse } from '../utils/apiHelper';

const { defineActionLoading, defineActionSuccess, defineActionFailed } = reduxUtil;

const {
    GET_RANKS_LIST,
    GET_RANKS_BY_ID,
    UPDATE_RANKS,
    DELETE_RANKS,
    CREATE_RANKS,
} = actionTypes;


function* getRanksList({ payload: { params } }) {
    const apiParams = apiConfig.ranks.getList;
    const searchParams = { page: params.page, size: params.size,sort:params.sort };

    if(params.kind) {
        searchParams.kind = params.kind
    }

    if(params.parentId) {
        searchParams.parentId = params.parentId
    }

    if(params.search) {
        if(params.search.name) {
            searchParams.name = params.search.name
        }
        if(params.search.status) {
            searchParams.status = params.search.status
        }
    }
    try {
        const result = yield call(sendRequest, apiParams, searchParams);
        yield put({
            type: defineActionSuccess(GET_RANKS_LIST),
            ranksData: result.responseData && result.responseData.data,
        });
    }
    catch(error) {
        yield put({ type: defineActionFailed(GET_RANKS_LIST) });
    }
}

function* getRanksById({ payload: { params, onCompleted, onError } }) {
    try {
        const apiParams = {
            ...apiConfig.ranks.getById,
            path: `${apiConfig.ranks.getById.path}/${params.id}`
        }
        const result = yield call(sendRequest, apiParams);
        handleApiResponse(result, onCompleted, onError);
    }
    catch(error) {
        onError(error);
    }
}

function* createRanks({payload: { params, onCompleted, onError }}){
    try {
        const apiParams = apiConfig.ranks.create;
        const result = yield call(sendRequest, apiParams, params);
        handleApiResponse(result, onCompleted, onError);
    }
    catch(error) {
        onError(error);
    }
}

function* updateRanks({ payload: { params, onCompleted, onError } }) {
    try {
        const apiParams = apiConfig.ranks.update;
        const result = yield call(sendRequest, apiParams, params);
        handleApiResponse(result, onCompleted, onError);
    }
    catch(error) {
        onError(error);
    }
}

function* deleteRanks({ payload: { params, onCompleted, onError } }) {
    try {
        const apiParams = {
            ...apiConfig.ranks.delete,
            path: `${apiConfig.ranks.delete.path}/${params.id}`
        }
        const { success, responseData } = yield call(sendRequest, apiParams);
        handleApiResponse({ success, responseData }, onCompleted, onError);

        if(!success || !responseData.result)
            yield put({ type: defineActionFailed(DELETE_RANKS) });
    }
    catch(error) {
        yield put({ type: defineActionFailed(DELETE_RANKS) });
        onError(error);
    }
}

const sagas = [
    takeLatest(defineActionLoading(GET_RANKS_LIST), getRanksList),
    takeLatest(GET_RANKS_BY_ID, getRanksById),
    takeLatest(UPDATE_RANKS, updateRanks),
    takeLatest(CREATE_RANKS, createRanks),
    takeLatest(defineActionLoading(DELETE_RANKS), deleteRanks),
]

export default sagas;