import reduxHelper from '../utils/redux';

export const reduxUtil = reduxHelper('TAGS');

const { defineAction, createActionWithLoading, createAction } = reduxUtil;

export const actionTypes = {
    GET_TAGS_LIST: defineAction('GET_TAGS_LIST'),
    CREATE_TAGS: defineAction('CREATE_TAGS'),
    GET_TAGS_DROPDOWN: defineAction('GET_TAGS_DROPDOWN'),
    GET_TAGS_BY_ID: defineAction('GET_TAGS_BY_ID'),
    UPDATE_TAGS: defineAction('UPDATE_TAGS'),
    DELETE_TAGS: defineAction('DELETE_TAGS'),
    GET_TAGS_AUTOCOMPLETE : defineAction('GET_TAGS_AUTOCOMPLETE'),
}

export const actions = {
    getTagsList: createActionWithLoading(actionTypes.GET_TAGS_LIST),
    createTags: createAction(actionTypes.CREATE_TAGS),
    getTagsDropDown: createAction(actionTypes.GET_TAGS_DROPDOWN),
    getTagsById: createAction(actionTypes.GET_TAGS_BY_ID),
    updateTags: createAction(actionTypes.UPDATE_TAGS),
    deleteTags: createActionWithLoading(actionTypes.DELETE_TAGS),
    getTagsAutoComplete: createActionWithLoading(actionTypes.GET_TAGS_AUTOCOMPLETE)
}