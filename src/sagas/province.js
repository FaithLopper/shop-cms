import { actionTypes, reduxUtil } from "../actions/province";
import { ProvinceKinds } from "../constants";
import apiConfig from "../constants/apiConfig";
import { call, put, takeEvery, takeLatest,all } from "redux-saga/effects";
import { sendRequest } from "../services/apiService";
import { handleApiResponse } from "../utils/apiHelper";
const { defineActionSuccess, defineActionFailed, defineActionLoading } =
  reduxUtil;
const {
  GET_PROVINCE_LIST,
  DELETE_PROVINCE,
} = actionTypes;

function* getProvinceList({ payload: { params } }) {
  const apiParams = apiConfig.province.getList;
  
  let searchParams = {
    page: params.page,
    size: params.size
  };
  if(params.kind === ProvinceKinds.commune.name){
    searchParams.kind=ProvinceKinds.commune.level
  }else if(params.kind === ProvinceKinds.district.name){
    searchParams.kind=ProvinceKinds.district.level
  }else{
    searchParams.kind=ProvinceKinds.province.level
  }
  if(params.parentId){
    searchParams.parentId=params.parentId
  }
  if (params.search) {
    if (params.search.status) searchParams.status = params.search.status;
    if (params.search.name) {
      searchParams.name = params.search.name;
    }
  }
  try {
    const result = yield call(sendRequest, apiParams, searchParams);
    yield put({
      type: defineActionSuccess(GET_PROVINCE_LIST),
      provinceData: result.responseData && result.responseData.data,
    });
  } catch (error) {
    yield put({ type: defineActionFailed(GET_PROVINCE_LIST) });
  }
}
function* getProvinceById({ payload: { params, onCompleted, onError } }) {
  try {
    const apiParams = {
      ...apiConfig.province.getById,
      path: `${apiConfig.province.getById.path}/${params.id}`,
    };
    const result = yield call(sendRequest, apiParams);
    handleApiResponse(result, onCompleted, onError);
  } catch (error) {
    onError(error);
  }
}
function* createProvince({ payload: { params, onCompleted, onError } }) {
  try {
    const result = yield call(sendRequest, apiConfig.province.create, params);
    handleApiResponse(result, onCompleted, onError);
  } catch (error) {
    onError(error);
  }
}
function* updateProvince ({payload:{params, onCompleted, onError}}){
  try {
    const result = yield call(sendRequest, apiConfig.province.update,params)
    handleApiResponse(result, onCompleted, onError)
  } catch (error) {
    onError(error)
  }
}
function* deleteProvince({ payload: { params, onCompleted, onError } }) {
  try {
    const apiParams = {
      ...apiConfig.province.delete,
      path: `${apiConfig.province.delete.path}/${params.id}`,
    };

    const result = yield call(sendRequest, apiParams);
    handleApiResponse(result, onCompleted, onError)
    const {success, responseData}= result
    if(!success || !responseData.result){
      yield put({type:defineActionFailed(DELETE_PROVINCE)})
    }
  } catch (error) {
    yield put({type:defineActionFailed(DELETE_PROVINCE)})
    onError(error)
  }
}
function* getLocationForDropDown({ payload: { params, onCompleted, onError } }) {
  try {
    const result = yield call(sendRequest, apiConfig.province.getList, params);
    handleApiResponse(result, onCompleted, onError);
  } catch (error) {
    onError(error);
  }
}
function* getLocationForDropDownDetail({ payload: { params, onCompleted, onError } }) {
  try {
    const { province, district,commune } = yield all({
      province: call(sendRequest, apiConfig.province.getList, {page:params.page, size: params.size,kind:ProvinceKinds.province.level}),
      district: call(sendRequest, apiConfig.province.getList, {page:params.page, size: params.size,kind:params.districtKind,parentId:params.districtParentId}),
      commune: call(sendRequest, apiConfig.province.getList, {page:params.page, size: params.size,kind:params.wardKind,parentId:params.wardParentId}),
    })
    handleApiResponse({success:province.success,responseData:{result:province.responseData.result,data:{province:{data: province.responseData.data.data}
      , district:{data: district.responseData.data.data}
      ,commune:{data: commune.responseData.data.data}}}}, onCompleted, onError);
  } catch (error) {
    onError(error);
  }
}
const sagas = [
  takeLatest(defineActionLoading(GET_PROVINCE_LIST), getProvinceList),
  takeLatest(actionTypes.GET_PROVINCE_BY_ID,getProvinceById),
  takeLatest(actionTypes.CREATE_PROVINCE,createProvince),
  takeLatest(actionTypes.UPDATE_PROVINCE, updateProvince),
  takeLatest(defineActionLoading(DELETE_PROVINCE),deleteProvince),
  takeEvery(actionTypes.GET_LOCATION,getLocationForDropDown),
  takeLatest(actionTypes.GET_LOCATION_DETAIL,getLocationForDropDownDetail),
];

export default sagas;
