import { call, put, takeLatest } from "redux-saga/effects";

import { sendRequest } from "../services/apiService";
import { actionTypes, reduxUtil } from "../actions/order";
import apiConfig from "../constants/apiConfig";
import { handleApiResponse } from "../utils/apiHelper";

const { defineActionLoading, defineActionSuccess, defineActionFailed } =
  reduxUtil;

const { GET_ORDER_LIST, GET_ORDER_BY_ID, UPDATE_STATUS_ORDER } = actionTypes;

function* getOrderList({ payload: { params } }) {
  const apiParams = apiConfig.order.getList;
  const searchParams = { page: params.page, size: params.size };

  if (params.kind) {
    searchParams.kind = params.kind;
  }

  if (params.search) {
    if (params.search.id) {
      searchParams.id = params.search.id;
    }
    if (params.search.status) {
      searchParams.orderStatus = params.search.status;
    }
  }
  try {
    const result = yield call(sendRequest, apiParams, searchParams);
    yield put({
      type: defineActionSuccess(GET_ORDER_LIST),
      orderData: result.responseData && result.responseData.data,
    });
  } catch (error) {
    yield put({ type: defineActionFailed(GET_ORDER_LIST) });
  }
}

function* getOrderById({ payload: { params, onCompleted, onError } }) {
  try {
    const apiParams = {
      ...apiConfig.order.getById,
      path: `${apiConfig.order.getById.path}/${params.id}`,
    };
    const result = yield call(sendRequest, apiParams);
    handleApiResponse(result, onCompleted, onError);
  } catch (error) {
    onError(error);
  }
}

function* updateStatusOrder({ payload: { params, onCompleted, onError } }) {
  try {
    const apiParams = apiConfig.order.update;
    const result = yield call(sendRequest, apiParams, params);
    handleApiResponse(result, onCompleted, onError);
  } catch (error) {
    onError(error);
  }
}

const sagas = [
  takeLatest(defineActionLoading(GET_ORDER_LIST), getOrderList),
  takeLatest(GET_ORDER_BY_ID, getOrderById),
  takeLatest(UPDATE_STATUS_ORDER, updateStatusOrder),
];

export default sagas;
