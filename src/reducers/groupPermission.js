import { actionTypes, reduxUtil } from '../actions/groupPermission';

const { createReducer, defineActionSuccess, defineActionLoading } = reduxUtil;
const {
    GET_GROUP_PERMISSION_LIST,
    GET_PERMISSION_LIST,
    SEARCH_GROUP_PERMISSION,
    GROUP_PERMISSION_AUTOCOMPLETE
} = actionTypes;

const initialState = {
    groupPermissionData: {},
    permissions: [],
    groupPermissions: [],
    searchGroupPermissionLoading: false,
    tbGroupPermissionLoading: false,
};

const reducer = createReducer({
        [defineActionLoading(GET_GROUP_PERMISSION_LIST)]: (state) => {
            return {
                ...state,
                tbGroupPermissionLoading: true
            }
        },
        [defineActionSuccess(GET_GROUP_PERMISSION_LIST)]: (state, { groupPermissionData }) => {
            return {
                ...state,
                groupPermissionData,
                tbGroupPermissionLoading: false
            }
        },
        [defineActionLoading(SEARCH_GROUP_PERMISSION)]: (state) => {
            return {
                ...state,
                searchGroupPermissionLoading: true
            }
        },
        [defineActionSuccess(SEARCH_GROUP_PERMISSION)]: (state, { groupPermissions }) => {
            return {
                ...state,
                groupPermissions,
                searchGroupPermissionLoading: false
            }
        },
        [defineActionSuccess(GET_PERMISSION_LIST)]: (state, { permissions }) => {
            return {
                ...state,
                permissions
            }
        },
        [defineActionLoading(GROUP_PERMISSION_AUTOCOMPLETE)]: (state) => {
            return {
                ...state,
                tbGroupPermissionLoading: true
            }
        },
        [defineActionSuccess(GROUP_PERMISSION_AUTOCOMPLETE)]: (
            state, { groupPermissionData }
          ) => {
            return {
                ...state,
                groupPermissionData,
                tbGroupPermissionLoading: false
            }
          },
    },
    initialState
)

export default {
    reducer
};
