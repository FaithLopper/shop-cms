import reduxHelper from '../utils/redux';

export const reduxUtil = reduxHelper('STORE');

const { defineAction, createActionWithLoading, createAction } = reduxUtil;

export const actionTypes = {
    GET_STORE_LIST: defineAction('GET_STORE_LIST'),
    CREATE_STORE: defineAction('CREATE_STORE'),
    GET_STORE_BY_ID: defineAction('GET_STORE_BY_ID'),
    UPDATE_STORE: defineAction('UPDATE_STORE'),
    DELETE_STORE: defineAction('DELETE_STORE'),
    GET_STORE_AUTOCOMPLETE: defineAction('GET_STORE_AUTOCOMPLETE'),
}

export const actions = {
    getStoreList: createActionWithLoading(actionTypes.GET_STORE_LIST),
    createStore: createAction(actionTypes.CREATE_STORE),
    getStoreById: createAction(actionTypes.GET_STORE_BY_ID),
    updateStore: createAction(actionTypes.UPDATE_STORE),
    deleteStore: createActionWithLoading(actionTypes.DELETE_STORE),
    getStoreAutoComplete: createActionWithLoading(actionTypes.GET_STORE_AUTOCOMPLETE)
}