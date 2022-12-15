import reduxHelper from '../utils/redux';

export const reduxUtil = reduxHelper('VARIANT');

const { defineAction, createActionWithLoading, createAction } = reduxUtil;

export const actionTypes = {
    GET_VARIANT_LIST: defineAction('GET_VARIANT_LIST'),
    GET_VARIANT_LIST_MODAL: defineAction('GET_VARIANT_LIST_MODAL'),
    CREATE_VARIANT: defineAction('CREATE_VARIANT'),
    GET_VARIANT_BY_ID: defineAction('GET_VARIANT_BY_ID'),
    UPDATE_VARIANT: defineAction('UPDATE_VARIANT'),
    DELETE_VARIANT: defineAction('DELETE_VARIANT'),
    GET_VARIANT_AUTOCOMPLETE: defineAction('GET_VARIANT_AUTOCOMPLETE'),
}

export const actions = {
    getVariantList: createActionWithLoading(actionTypes.GET_VARIANT_LIST),
    getVariantListModal: createAction(actionTypes.GET_VARIANT_LIST_MODAL),
    createVariant: createAction(actionTypes.CREATE_VARIANT),
    getVariantById: createAction(actionTypes.GET_VARIANT_BY_ID),
    updateVariant: createAction(actionTypes.UPDATE_VARIANT),
    deleteVariant: createActionWithLoading(actionTypes.DELETE_VARIANT),
    getVariantAutoComplete: createActionWithLoading(actionTypes.GET_VARIANT_AUTOCOMPLETE)
}