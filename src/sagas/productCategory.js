import { all, call, put, takeLatest } from "redux-saga/effects";

import { sendRequest } from "../services/apiService";
import { actionTypes, reduxUtil } from "../actions/productCategory";
import apiConfig from "../constants/apiConfig";
import { handleApiResponse } from "../utils/apiHelper";

const { defineActionLoading, defineActionSuccess, defineActionFailed } =
  reduxUtil;

const {
  GET_PRODUCT_CATEGORY_LIST,
  GET_PRODUCT_CATEGORY_BY_ID,
  UPDATE_PRODUCT_CATEGORY,
  DELETE_PRODUCT_CATEGORY,
  CREATE_PRODUCT_CATEGORY,
  GET_PRODUCT_CATEGORY_COMBOBOX,
  SORT_PRODUCT_CATEGORY
} = actionTypes;

function* getProductCategoryList({ payload: { params } }) {
  const apiParams = apiConfig.productCategory.getList;
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
    if (params.isChild && !params.parentId) {
      throw new Error("can't find parent category");
    }

    const result = yield call(sendRequest, apiParams, searchParams);
    yield put({
      type: defineActionSuccess(GET_PRODUCT_CATEGORY_LIST),
      productCategoryData: result.responseData && result.responseData.data,
    });
  } catch (error) {
    yield put({ type: defineActionFailed(GET_PRODUCT_CATEGORY_LIST) });
  }
}

function* getProductCategoryById({
  payload: { params, onCompleted, onError },
}) {
  try {
    const apiParams = {
      ...apiConfig.productCategory.getById,
      path: `${apiConfig.productCategory.getById.path}/${params.id}`,
    };
    const result = yield call(sendRequest, apiParams);
    handleApiResponse(result, onCompleted, onError);
  } catch (error) {
    onError(error);
  }
}

function* createProductCategory({ payload: { params, onCompleted, onError } }) {
  try {
    if (params.isChild && !params.parentId)
      throw new Error("can't find parent category");

    const apiParams = apiConfig.productCategory.create;
    const result = yield call(sendRequest, apiParams, params);
    handleApiResponse(result, onCompleted, onError);
  } catch (error) {
    onError(error);
  }
}

function* getProductCategoryCombobox({ payload: { params, onCompleted, onError } }) {
  try {
    const apiParams = apiConfig.productCategory.getList;
    const result = yield call(sendRequest, apiParams, params);
    handleApiResponse(result, onCompleted, onError);
  } catch (error) {
    onError(error);
  }
}

function* updateProductCategory({ payload: { params, onCompleted, onError } }) {
  try {
    const apiParams = apiConfig.productCategory.update;
    const result = yield call(sendRequest, apiParams, params);
    handleApiResponse(result, onCompleted, onError);
  } catch (error) {
    onError(error);
  }
}

function* sortProductCategory({ payload: { params, onCompleted, onError } }) {
  try {
    const apiParams = apiConfig.productCategory.update;
    yield all([...params].map(param => call(sendRequest, apiParams, param)))
  } catch (error) {
    onError(error);
  }
}

function* deleteProductCategory({ payload: { params, onCompleted, onError } }) {
  try {
    const apiParams = {
      ...apiConfig.productCategory.delete,
      path: `${apiConfig.productCategory.delete.path}/${params.id}`,
    };
    const { success, responseData } = yield call(sendRequest, apiParams);
    handleApiResponse({ success, responseData }, onCompleted, onError);

    if (!success || !responseData.result)
      yield put({ type: defineActionFailed(DELETE_PRODUCT_CATEGORY) });
  } catch (error) {
    yield put({ type: defineActionFailed(DELETE_PRODUCT_CATEGORY) });
    onError(error);
  }
}

const sagas = [
  takeLatest(
    defineActionLoading(GET_PRODUCT_CATEGORY_LIST),
    getProductCategoryList
  ),
  takeLatest(GET_PRODUCT_CATEGORY_BY_ID, getProductCategoryById),
  takeLatest(UPDATE_PRODUCT_CATEGORY, updateProductCategory),
  takeLatest(SORT_PRODUCT_CATEGORY, sortProductCategory),
  takeLatest(CREATE_PRODUCT_CATEGORY, createProductCategory),
  takeLatest(GET_PRODUCT_CATEGORY_COMBOBOX, getProductCategoryCombobox),
  takeLatest(
    defineActionLoading(DELETE_PRODUCT_CATEGORY),
    deleteProductCategory
  ),
];

export default sagas;
