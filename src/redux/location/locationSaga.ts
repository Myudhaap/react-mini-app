import type { PayloadAction } from '@reduxjs/toolkit'
import { call, put, takeEvery } from 'redux-saga/effects'
import type { ILocationReq, ILocationRes } from '../../interfaces/location'
import * as api from '../../services/location.service'
import { getlocation, setLocation } from './locationSlice'

function* handleGetLocation(action: PayloadAction<ILocationReq>){
    const location: ILocationRes = yield call(api.getCurrentLocation, action.payload)
    yield put(setLocation(location.data))
}

export function* locationSaga(){
    yield takeEvery(getlocation.type, handleGetLocation);
}