import {actionTypes, reduxUtil} from "../actions/province"

const initialState={
    provinceData:{},
    provinceLoading:false,
    provinceAutoComple:{}
}
const {createReducer,defineActionLoading,defineActionFailed,defineActionSuccess} = reduxUtil


const {GET_PROVINCE_LIST,DELETE_PROVINCE,GET_PROVINCE_AUTOCOMPLETE}= actionTypes

const reducer = createReducer({
    [defineActionLoading(GET_PROVINCE_LIST)]:(state)=>{
        return {
            ...state,
            provinceLoading:true
        }
    },
    [defineActionSuccess(GET_PROVINCE_LIST)]:(state,{provinceData})=>{
        return {
            ...state,
            provinceData,
            provinceLoading:false
        }
    }, [defineActionSuccess(GET_PROVINCE_AUTOCOMPLETE)]:(state,{provinceAutoComple})=>{
        return {
            ...state,
            provinceAutoComple
        }
    },
    [defineActionLoading(DELETE_PROVINCE)]:(state)=>{
        return{
            ...state,
            provinceLoading:true
        }
    },
    [defineActionFailed(DELETE_PROVINCE)]:(state)=>{
        return{
            ...state,
            provinceLoading:false
        }
    },
    initialState
})

export default {
    reducer
}