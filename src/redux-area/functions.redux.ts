import { all, call, ForkEffect, put, PutEffect, takeLatest } from 'redux-saga/effects'
import { ApiResponse, create } from 'apisauce'
import { FetchAreaBase } from 'redux-area'
import { IFunction } from './IFunction'
import { IFunctionSearch } from './IFunctionSearch'
import { IStoreState } from '../config/configureStore'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// define the api
const api = create({
   baseURL: 'http://alf.academy/backend/api/',
   headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8'
   },
})
const endpoint = {
   searchFunction: (arg: IFunctionSearch) => api.post<IFunction[]>('function.php', arg)
}
export interface IFunctionState {
   functions: IFunction[]
}

const area = FetchAreaBase("alf").CreateArea({
   namePrefix: "functions",
   state: {
      functions: []
   } as IFunctionState
})
const areaSagaList: ForkEffect[] = []
function regSaga(reg: ForkEffect) {
   areaSagaList.push(reg)
}


export const _functionSearch = area.addFetch("FunctionSearch")
   .action((name: string) => ({ name }))
   .successAction((functions: IFunction[]) => ({ functions }))
   .successProduce((draft, { functions }) => {
      draft.functions = functions
   })
   .baseFailure()

regSaga(takeLatest(_functionSearch.request.name, function* (action: typeof _functionSearch.request.type) {
   const search: IFunctionSearch = { name: action.name }
   const response: ApiResponse<IFunction[]> = (yield call(endpoint.searchFunction, search)) as any
   if (response.data) {
      console.log("SAGA INSITE..", response)
      yield put(_functionSearch.success(response.data))
   }
}))



export function* rootSaga() {
   yield all(areaSagaList)
}
export const rootReducer = area.rootReducer()

const useFunctions = () => {
   const dispatch = useDispatch()
   const search = useCallback((name: string) => dispatch(_functionSearch.request(name)), [dispatch])
   return {
      functions: useSelector((state: IStoreState) => state.functions),
      search
   }
}

export default useFunctions