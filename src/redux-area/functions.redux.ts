import { ApiResponse, create } from 'apisauce'
import { FetchAreaBase } from 'redux-area'
import { IFunction } from './IFunction'
import { IFunctionSearch } from './IFunctionSearch'
import { IStoreState } from '../config/configureStore'
import { post } from './http'
import * as saga from 'redux-saga/effects'
import { SagaIterator } from 'redux-saga'
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
const areaSagaList: saga.ForkEffect[] = []
function regSaga(type: string, gen: (action: any) => Generator) {
   areaSagaList.push(
      saga.takeLatest(type, gen)
   )
}

export const _functionSearch = area.addFetch("FunctionSearch")
   .action((name: string) => ({ name }))
   .successAction((functions: IFunction[]) => ({ functions }))
   .successProduce((draft, { functions }) => {
      draft.functions = functions
   })
   .baseFailure()

regSaga(_functionSearch.request.name, function* (action: typeof _functionSearch.request.type) {
   const search: IFunctionSearch = { name: action.name }
   const response: ApiResponse<IFunction[]> = (yield saga.call(endpoint.searchFunction, search)) as any
   if (response.data) {
      console.log("SAGA INSITE..", response)
      yield saga.put(_functionSearch.success(response.data))
   }
})


export function* rootSaga() {
   console.log("SAGA!", areaSagaList)
   yield saga.all(areaSagaList)
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