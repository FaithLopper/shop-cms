import reduxHelper from '../utils/redux';

export const reduxUtil = reduxHelper('ORDER');

const { defineAction, createActionWithLoading, createAction } = reduxUtil;

export const actionTypes = {
    GET_ORDER_LIST: defineAction('GET_ORDER_LIST'),
    GET_ORDER_BY_ID: defineAction('GET_ORDER_BY_ID'),
    UPDATE_STATUS_ORDER: defineAction('UPDATE_ORDER'),
}

export const actions = {
    getOrderList: createActionWithLoading(actionTypes.GET_ORDER_LIST),
    getOrderById: createAction(actionTypes.GET_ORDER_BY_ID),
    updateStatusOrder: createAction(actionTypes.UPDATE_STATUS_ORDER),
}