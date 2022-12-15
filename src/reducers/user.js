import { actionTypes, reduxUtil } from '../actions/user';

const { createReducer, defineActionSuccess, defineActionLoading, defineActionFailed } = reduxUtil;
const {
    GET_USER_ADMIN_LIST,
    DELETE_ADMIN,
} = actionTypes;

const initialState = {
    userAdminData: {},
    shopAccountData: {},
    users: [],
    tbUserAdminLoading: false,
    tbCustomerLoading: false,
    searhLoading: false
};

const reducer = createReducer({
        [defineActionLoading(GET_USER_ADMIN_LIST)]: (state) => {
            return {
                ...state,
                tbUserAdminLoading: true
            }
        },
        [defineActionSuccess(GET_USER_ADMIN_LIST)]: (state, { userAdminData }) => {
            return {
                ...state,
                userAdminData,
                tbUserAdminLoading: false
            }
        },
        [defineActionLoading(DELETE_ADMIN)] : (state) =>{
            return {
                ...state,
                tbUserAdminLoading: true,
            }
        },
        [defineActionFailed(DELETE_ADMIN)] : (state) =>{
            return {
                ...state,
                tbUserAdminLoading: false,
            }
        },
    },
    initialState
)

export default {
    reducer
};
