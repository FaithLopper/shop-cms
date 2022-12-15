import { actionTypes, reduxUtil } from "../actions/category";

const {
  createReducer,
  defineActionSuccess,
  defineActionLoading,
  defineActionFailed,
} = reduxUtil;
const { GET_CATEGORY_LIST, DELETE_CATEGORY, GET_CATEGORY_AUTOCOMPLETE } =
  actionTypes;

const initialState = {
  categoryData: [],
  tbCategoryLoading: false,
  categoryAutoCompleteNews: [],
  categoryAutoCompleteJob: [],
  categoryAutoCompleteDepartment: [],
};

const reducer = createReducer(
  {
    [defineActionLoading(GET_CATEGORY_LIST)]: (state) => {
      return {
        ...state,
        tbCategoryLoading: true,
      };
    },
    [defineActionSuccess(GET_CATEGORY_LIST)]: (state, { categoryData }) => {
      return {
        ...state,
        categoryData,
        tbCategoryLoading: false,
      };
    },
    [defineActionSuccess(GET_CATEGORY_AUTOCOMPLETE)]: (
      state,
      { categoryAutoComplete, kind }
    ) => {
      if (kind === 1) {
        return {
          ...state,
          categoryAutoCompleteNews: categoryAutoComplete,
        };
      } else if (kind === 2) {
        return {
          ...state,
          categoryAutoCompleteJob: categoryAutoComplete,
        };
      } else
        return {
          ...state,
          categoryAutoCompleteDepartment: categoryAutoComplete,
        };
    },
    [defineActionLoading(DELETE_CATEGORY)]: (state) => {
      return {
        ...state,
        tbCategoryLoading: true,
      };
    },
    [defineActionFailed(DELETE_CATEGORY)]: (state) => {
      return {
        ...state,
        tbCategoryLoading: false,
      };
    },
  },
  initialState
);

export default {
  reducer,
};
