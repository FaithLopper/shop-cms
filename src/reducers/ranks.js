import { actionTypes, reduxUtil } from '../actions/ranks';

const { createReducer, defineActionSuccess, defineActionLoading, defineActionFailed } = reduxUtil;
const {
    GET_RANKS_LIST,
    DELETE_RANKS,
} = actionTypes;

const initialState = { 
    ranksData: [],
    tbRanksLoading: false,
};

const reducer = createReducer({
        [defineActionLoading(GET_RANKS_LIST)]: (state) => {
            return {
                ...state,
                tbRanksLoading: true
            }
        },
        [defineActionSuccess(GET_RANKS_LIST)]: (state, { ranksData }) => {
            return {
                ...state,
                ranksData,
                tbRanksLoading: false
            }
        },
        [defineActionLoading(DELETE_RANKS)] : (state) =>{
            return {
                ...state,
                tbRanksLoading: true,
            }
        },
        [defineActionFailed(DELETE_RANKS)] : (state) =>{
            return {
                ...state,
                tbRanksLoading: false,
            }
        }
    },
    initialState
)

export default {
    reducer
};
