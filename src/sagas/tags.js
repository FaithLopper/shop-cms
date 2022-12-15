import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

import { sendRequest } from "../services/apiService";
import { actionTypes, reduxUtil } from "../actions/tags";
import apiConfig from "../constants/apiConfig";
import { handleApiResponse } from "../utils/apiHelper";

const { defineActionLoading, defineActionSuccess, defineActionFailed } =
  reduxUtil;

const {
  GET_TAGS_LIST,
  GET_TAGS_BY_ID,
  UPDATE_TAGS,
  DELETE_TAGS,
  CREATE_TAGS,
  GET_TAGS_AUTOCOMPLETE,
  GET_TAGS_DROPDOWN
} = actionTypes;

function* getTagsList({ payload: { params } }) {
  const apiParams = apiConfig.tags.getList;
  const searchParams = { page: params.page, size: params.size };

  if (params.kind) {
    searchParams.kind = params.kind;
  }

  if (params.parentId) {
    searchParams.parentId = params.parentId;
  }

  if (params.search) {
    if (params.search.name) {
      searchParams.name = params.search.name;
    }
    if (params.search.status) {
      searchParams.status = params.search.status;
    }
  }
  try {
    const result = yield call(sendRequest, apiParams, searchParams);
    yield put({
      type: defineActionSuccess(GET_TAGS_LIST),
      tagsData: result.responseData && result.responseData.data,
    });
  } catch (error) {
    yield put({ type: defineActionFailed(GET_TAGS_LIST) });
  }
}

function* getTagsById({ payload: { params, onCompleted, onError } }) {
  try {
    const apiParams = {
      ...apiConfig.tags.getById,
      path: `${apiConfig.tags.getById.path}/${params.id}`,
    };
    const result = yield call(sendRequest, apiParams);
    handleApiResponse(result, onCompleted, onError);
  } catch (error) {
    onError(error);
  }
}

function* createTags({ payload: { params, onCompleted, onError } }) {
  try {
    const apiParams = apiConfig.tags.create;
    const result = yield call(sendRequest, apiParams, params);
    handleApiResponse(result, onCompleted, onError);
  } catch (error) {
    onError(error);
  }
}

function* getTagDropDown({ payload: { params, onCompleted, onError } }) {
  try {
    const apiParams = apiConfig.tags.getList;
    const result = yield call(sendRequest, apiParams, params);
    handleApiResponse(result, onCompleted, onError);
  } catch (error) {
    onError(error);
  }
}

function* updateTags({ payload: { params, onCompleted, onError } }) {
  try {
    const apiParams = apiConfig.tags.update;
    const result = yield call(sendRequest, apiParams, params);
    handleApiResponse(result, onCompleted, onError);
  } catch (error) {
    onError(error);
  }
}

function* deleteTags({ payload: { params, onCompleted, onError } }) {
  try {
    const apiParams = {
      ...apiConfig.tags.delete,
      path: `${apiConfig.tags.delete.path}/${params.id}`,
    };
    const { success, responseData } = yield call(sendRequest, apiParams);
    handleApiResponse({ success, responseData }, onCompleted, onError);

    if (!success || !responseData.result)
      yield put({ type: defineActionFailed(DELETE_TAGS) });
  } catch (error) {
    yield put({ type: defineActionFailed(DELETE_TAGS) });
    onError(error);
  }
}

function* getTagsAutoComplete({ payload: { kind } }) {
  const apiParams = apiConfig.tags.tagsAutoComplete;

  try {
    const result = yield call(sendRequest, apiParams, { kind });
    yield put({
      type: defineActionSuccess(GET_TAGS_AUTOCOMPLETE),
      tagsAutoComplete: result.responseData && {
        ...result.responseData.data,
      },
      kind,
    });
  } catch (error) {
    yield put({ type: defineActionFailed(GET_TAGS_AUTOCOMPLETE) });
  }
}

const sagas = [
  takeLatest(defineActionLoading(GET_TAGS_LIST), getTagsList),
  takeLatest(GET_TAGS_BY_ID, getTagsById),
  takeLatest(UPDATE_TAGS, updateTags),
  takeLatest(GET_TAGS_DROPDOWN, getTagDropDown),
  takeLatest(CREATE_TAGS, createTags),
  takeLatest(defineActionLoading(DELETE_TAGS), deleteTags),
  takeEvery(defineActionLoading(GET_TAGS_AUTOCOMPLETE), getTagsAutoComplete),
];

export default sagas;
