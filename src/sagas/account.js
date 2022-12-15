import { call, takeLatest, put } from "redux-saga/effects";

import { sendRequest } from "../services/apiService";
import { actionTypes, reduxUtil } from "../actions/account";
import { actions } from "../actions";
import apiConfig from "../constants/apiConfig";
import { UserTypes } from "../constants";
import { handleApiResponse } from '../utils/apiHelper';

const { LOGIN, LOGOUT, UPDATE_PROFILE, GET_PROFILE } = actionTypes;

const {
  defineActionLoading,
  defineActionSuccess,
  defineActionFailed,
} = reduxUtil;

function* login({ payload: { params, onCompleted, onError } }) {
  try {
    let cmsParams = {
      ...params,
      app: "APP_WEB_CMS"
    }
    
    const result = yield call(sendRequest, apiConfig.account.login, cmsParams);
    const { success, responseData } = result;
    
    if (success && responseData.result) {
      let apiParams;
      if(responseData.data?.kind === UserTypes.ADMIN) {
        apiParams = apiConfig.account.getAdminProfile;
      }
      else {
        apiParams = apiConfig.employee.getEmployeeProfile;
      }
      const profileResult = yield call(
        sendRequest,
        apiParams,
        {},
        responseData.data.token
      );
      if (profileResult.success && profileResult.responseData.result) {
        let permissions = [];
        if (
          profileResult.responseData.data.group &&
          profileResult.responseData.data.group.permissions
        ) {
          permissions = profileResult.responseData.data.group.permissions.map(
            (permission) => permission.action
          );
        }
        else if(profileResult.responseData.data.account.group &&
          profileResult.responseData.data.account.group.permissions){
         permissions = profileResult.responseData.data.account.group.permissions.map(
           (permission) => permission.action
         );
       }
        // const groupedSettings = settingsData.map(e=>e.value)
        onCompleted({
          token: responseData.data.token,
          id: profileResult.responseData.data.id,
          avatar: profileResult.responseData.data.avatar ? profileResult.responseData.data.avatar : profileResult.responseData.data.account?.avatar ? profileResult.responseData.data.account?.avatar : null,
          logo: profileResult.responseData.data.logoPath,
          username: profileResult.responseData.data.username ? profileResult.responseData.data.username : profileResult.responseData.data.account.username,
          fullName: profileResult.responseData.data.fullName ? profileResult.responseData.data.fullName : profileResult.responseData.data.account.fullName,
          kind: profileResult.responseData.data.kind ? profileResult.responseData.data.kind : profileResult.responseData.data.account.kind,
          isSuperAdmin: profileResult.responseData.data.isSuperAdmin ? profileResult.responseData.data.isSuperAdmin : profileResult.responseData.data.account?.isSuperAdmin,
          permissions,
        });
      } else {
        onError(responseData);
      }
    } else {
      onError(responseData);
    }
  } catch (error) {
    onError(error);
  }
}

function* logout() {
  try {
    yield call(sendRequest, apiConfig.account.logout);
  } catch (error) {
    // onError(error);
  }
}

function* getProfile({ payload }) {
  try {
    let result;
    if(actions.getUserData()?.kind === UserTypes.ADMIN) {
      result = yield call(sendRequest, apiConfig.account.getAdminProfile);
    }
    else {
      result = yield call(sendRequest, apiConfig.employee.getEmployeeProfile);
    }
    yield put({
      type: defineActionSuccess(GET_PROFILE),
      data: result.responseData && result.responseData.data,
    });
    yield put(actions.hideFullScreenLoading());
  } catch (error) {
    yield put({ type: defineActionFailed(GET_PROFILE) });
  }
}

function* updateProfile({ payload: { params, onCompleted, onError } }) {
  try {
    let userData;
    if(actions.getUserData()?.kind === UserTypes.ADMIN) {
      userData = yield call(sendRequest, apiConfig.account.updateProfileAdmin, params);
      yield call(sendRequest, apiConfig.account.getAdminProfile)
    }
    else {
      userData = yield call(sendRequest, apiConfig.employee.updateProfile, params);
    }
    handleApiResponse(userData, onCompleted, onError);
  } catch (error) {
    onError();
  }
}

const sagas = [
  takeLatest(defineActionLoading(LOGIN), login),
  takeLatest(LOGOUT, logout),
  takeLatest(GET_PROFILE, getProfile),
  takeLatest(defineActionLoading(UPDATE_PROFILE), updateProfile),
];

export default sagas;
