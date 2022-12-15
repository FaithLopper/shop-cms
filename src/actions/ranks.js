import reduxHelper from '../utils/redux';

export const reduxUtil = reduxHelper('RANKS');

const { defineAction, createActionWithLoading, createAction } = reduxUtil;

export const actionTypes = {
    GET_RANKS_LIST: defineAction('GET_RANKS_LIST'),
    CREATE_RANKS: defineAction('CREATE_RANKS'),
    GET_RANKS_BY_ID: defineAction('GET_RANKS_BY_ID'),
    UPDATE_RANKS: defineAction('UPDATE_RANKS'),
    DELETE_RANKS: defineAction('DELETE_RANKS'),
}

export const actions = {
    getRanksList: createActionWithLoading(actionTypes.GET_RANKS_LIST),
    createRanks: createAction(actionTypes.CREATE_RANKS),
    getRanksById: createAction(actionTypes.GET_RANKS_BY_ID),
    updateRanks: createAction(actionTypes.UPDATE_RANKS),
    deleteRanks: createActionWithLoading(actionTypes.DELETE_RANKS)
}