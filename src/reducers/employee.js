import { actionTypes, reduxUtil } from '../actions/employee';

const { createReducer, defineActionSuccess, defineActionLoading, defineActionFailed } = reduxUtil;
const {
    GET_USER_EMPLOY_LIST,
    DELETE_USER_EMPLOY,
} = actionTypes;

const initialState = {
    userEmployListData: {},
    tbUserEmployLoading: false,
    searhLoading: false
};

const reducer = createReducer({
        [defineActionLoading(GET_USER_EMPLOY_LIST)]: (state) => {
            return {
                ...state,
                tbUserEmployLoading: true
            }
        },
        [defineActionSuccess(GET_USER_EMPLOY_LIST)]: (state, { userEmployListData }) => {
            return {
                ...state,
                userEmployListData,
                tbUserEmployLoading: false
            }
        },
        [defineActionLoading(DELETE_USER_EMPLOY)] : (state) =>{
            return {
                ...state,
                tbUserEmployLoading: true,
            }
        },
        [defineActionFailed(DELETE_USER_EMPLOY)] : (state) =>{
            return {
                ...state,
                tbUserEmployLoading: false,
            }
        },
    },
    initialState
)

export default {
    reducer
};
