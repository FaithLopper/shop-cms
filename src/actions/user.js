import reduxHelper from '../utils/redux';

export const reduxUtil = reduxHelper('USER');

const { defineAction, createActionWithLoading, createAction } = reduxUtil;

export const actionTypes = {
    GET_USER_ADMIN_LIST: defineAction('GET_USER_ADMIN_LIST'),
    GET_USER_BY_ID: defineAction('GET_USER_BY_ID'),
    CREATE_USER: defineAction('CREATE_USER'),
    UPDATE_USER: defineAction('UPDATE_USER'),
    DELETE_ADMIN: defineAction('DELETE_ADMIN'),
}

export const actions = {
    getUserAdminList: createActionWithLoading(actionTypes.GET_USER_ADMIN_LIST),
    getUserById: createAction(actionTypes.GET_USER_BY_ID),
    createUser: createAction(actionTypes.CREATE_USER),
    updateUser: createAction(actionTypes.UPDATE_USER),
    deleteAdmin: createActionWithLoading(actionTypes.DELETE_ADMIN),
}