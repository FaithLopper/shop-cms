import { actionTypes, reduxUtil } from "../actions/order";

const {
  createReducer,
  defineActionSuccess,
  defineActionLoading,
} = reduxUtil;
const { GET_ORDER_LIST } = actionTypes;

const initialState = {
  orderData: [],
  tbOrderLoading: false,
};

const reducer = createReducer(
  {
    [defineActionLoading(GET_ORDER_LIST)]: (state) => {
      return {
        ...state,
        tbOrderLoading: true,
      };
    },
    [defineActionSuccess(GET_ORDER_LIST)]: (state, { orderData }) => {
      return {
        ...state,
        orderData,
        tbOrderLoading: false,
      };
    },
  },
  initialState
);

export default {
  reducer,
};
