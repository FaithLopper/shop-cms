import reduxHelper from '../utils/redux';

export const reduxUtil = reduxHelper('EMPLOY');

const { defineAction, createActionWithLoading, createAction } = reduxUtil;

export const actionTypes = {
    GET_USER_EMPLOY_LIST: defineAction('GET_USER_EMPLOY_LIST'),
    GET_USER_EMPLOY_BY_ID: defineAction('GET_USER_EMPLOY_BY_ID'),
    CREATE_USER_EMPLOY: defineAction('CREATE_USER_EMPLOY'),
    UPDATE_USER_EMPLOY: defineAction('UPDATE_USER_EMPLOY'),
    DELETE_USER_EMPLOY: defineAction('DELETE_USER_EMPLOY'),
}

export const actions = {
    getUserEmployList: createActionWithLoading(actionTypes.GET_USER_EMPLOY_LIST),
    getUserEmployById: createAction(actionTypes.GET_USER_EMPLOY_BY_ID),
    createUserEmploy: createAction(actionTypes.CREATE_USER_EMPLOY),
    updateUserEmploy: createAction(actionTypes.UPDATE_USER_EMPLOY),
    deleteUserEmploy: createActionWithLoading(actionTypes.DELETE_USER_EMPLOY),
}