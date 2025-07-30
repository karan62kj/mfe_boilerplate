import { call, put, takeLatest } from "redux-saga/effects";
import { fetchUserApi } from "../../network/api/userApi";
import { fetchProfileFailure, fetchProfileStart, fetchProfileSuccess } from "../slices/profileSlice";
import type { SagaIterator } from "redux-saga";
import type { PayloadAction } from "@reduxjs/toolkit";


function* fetchProfile(action: PayloadAction<{ id: number }>): SagaIterator {
    try {
        const response = yield call(fetchUserApi, action.payload!.id);
        yield put(fetchProfileSuccess(response.data));
    } catch (error: unknown) {
        if (typeof error === 'object' && error !== null && 'message' in error) {
            yield put(fetchProfileFailure((error as { message?: string }).message || 'Failed to fetch profile'));
        } else {
            yield put(fetchProfileFailure('Failed to fetch profile'));
        }
    }
}

export default function* profileSaga() {
    yield takeLatest(fetchProfileStart.type, fetchProfile);
}