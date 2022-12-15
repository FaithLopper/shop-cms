import reduxHelper from '../utils/redux';

export const reduxUtil = reduxHelper('ADDRESS');

const { defineAction, createActionWithLoading, createAction } = reduxUtil;

export const actionTypes = {
    GET_ADDRESS_LIST: defineAction('GET_ADDRESS_LIST'),
    GET_ADDRESS_BY_ID: defineAction('GET_ADDRESS_BY_ID'),
    CREATE_ADDRESS: defineAction('CREATE_ADDRESS'),
    UPDATE_ADDRESS: defineAction('UPDATE_ADDRESS'),
    DELETE_ADDRESS: defineAction('DELETE_ADDRESS'),
    SET_DEFAULD_ADDRESS: defineAction('SET_DEFAULD_ADDRESS')
}

export const actions = {
    getAddressList: createActionWithLoading(actionTypes.GET_ADDRESS_LIST),
    getAddressById: createAction(actionTypes.GET_ADDRESS_BY_ID),
    createAddress: createAction(actionTypes.CREATE_ADDRESS),
    updateAddress: createAction(actionTypes.UPDATE_ADDRESS),
    deleteAddress: createActionWithLoading(actionTypes.DELETE_ADDRESS),
    setDefauldAddress:createAction(actionTypes.SET_DEFAULD_ADDRESS)
}