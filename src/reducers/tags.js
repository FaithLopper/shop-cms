import { actionTypes, reduxUtil } from "../actions/tags";

const {
  createReducer,
  defineActionSuccess,
  defineActionLoading,
  defineActionFailed,
} = reduxUtil;
const { GET_TAGS_LIST, DELETE_TAGS, GET_TAGS_AUTOCOMPLETE } = actionTypes;

const initialState = {
  tagsData: [],
  tbTagsLoading: false,
  tagsAutoComplete: [],
};

const reducer = createReducer(
  {
    [defineActionLoading(GET_TAGS_LIST)]: (state) => {
      return {
        ...state,
        tbTagsLoading: true,
      };
    },
    [defineActionSuccess(GET_TAGS_LIST)]: (state, { tagsData }) => {
      return {
        ...state,
        tagsData,
        tbTagsLoading: false,
      };
    },
    [defineActionSuccess(GET_TAGS_AUTOCOMPLETE)]: (
      state,
      { tagsAutoComplete }
    ) => {
      return {
        ...state,
        tagsAutoComplete: tagsAutoComplete,
      };
    },
    [defineActionLoading(DELETE_TAGS)]: (state) => {
      return {
        ...state,
        tbTagsLoading: true,
      };
    },
    [defineActionFailed(DELETE_TAGS)]: (state) => {
      return {
        ...state,
        tbTagsLoading: false,
      };
    },
  },
  initialState
);

export default {
  reducer,
};
