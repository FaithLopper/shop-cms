import { actionTypes, reduxUtil } from '../actions/productCategory';

const { createReducer, defineActionSuccess, defineActionLoading, defineActionFailed } = reduxUtil;
const {
    GET_PRODUCT_CATEGORY_LIST,
    DELETE_PRODUCT_CATEGORY,
} = actionTypes;

const initialState = { 
    productCategoryData: [],
    tbProductCategoryLoading: false,
};

const reducer = createReducer({
        [defineActionLoading(GET_PRODUCT_CATEGORY_LIST)]: (state) => {
            return {
                ...state,
                tbProductCategoryLoading: true
            }
        },
        [defineActionSuccess(GET_PRODUCT_CATEGORY_LIST)]: (state, { productCategoryData }) => {
            return {
                ...state,
                productCategoryData,
                tbProductCategoryLoading: false
            }
        },
        [defineActionLoading(DELETE_PRODUCT_CATEGORY)] : (state) =>{
            return {
                ...state,
                tbProductCategoryLoading: true,
            }
        },
        [defineActionFailed(DELETE_PRODUCT_CATEGORY)] : (state) =>{
            return {
                ...state,
                tbProductCategoryLoading: false,
            }
        }
    },
    initialState
)

export default {
    reducer
};
