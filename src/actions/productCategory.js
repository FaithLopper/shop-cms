import reduxHelper from '../utils/redux';

export const reduxUtil = reduxHelper('PRODUCT_CATEGORY');

const { defineAction, createActionWithLoading, createAction } = reduxUtil;

export const actionTypes = {
    GET_PRODUCT_CATEGORY_LIST: defineAction('GET_PRODUCT_CATEGORY_LIST'),
    CREATE_PRODUCT_CATEGORY: defineAction('CREATE_PRODUCT_CATEGORY'),
    GET_PRODUCT_CATEGORY_COMBOBOX: defineAction('GET_PRODUCT_CATEGORY_COMBOBOX'),
    GET_PRODUCT_CATEGORY_BY_ID: defineAction('GET_PRODUCT_CATEGORY_BY_ID'),
    UPDATE_PRODUCT_CATEGORY: defineAction('UPDATE_PRODUCT_CATEGORY'),
    SORT_PRODUCT_CATEGORY: defineAction('SORT_PRODUCT_CATEGORY'),
    DELETE_PRODUCT_CATEGORY: defineAction('DELETE_PRODUCT_CATEGORY'),
}

export const actions = {
    getProductCategoryList: createActionWithLoading(actionTypes.GET_PRODUCT_CATEGORY_LIST),
    createProductCategory: createAction(actionTypes.CREATE_PRODUCT_CATEGORY),
    getProductCategoryCombobox: createAction(actionTypes.GET_PRODUCT_CATEGORY_COMBOBOX),
    getProductCategoryById: createAction(actionTypes.GET_PRODUCT_CATEGORY_BY_ID),
    updateProductCategory: createAction(actionTypes.UPDATE_PRODUCT_CATEGORY),
    sortProductCategory: createAction(actionTypes.SORT_PRODUCT_CATEGORY),
    deleteProductCategory: createActionWithLoading(actionTypes.DELETE_PRODUCT_CATEGORY)
}