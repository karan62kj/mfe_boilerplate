import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import profileReducer from '../slices/profileSlice';
import profileSaga from '../sagas/profileSaga';

const sagaMiddleware = createSagaMiddleware();

export const appStore = configureStore({
    reducer: {
        profile: profileReducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            thunk: false,
        }).concat(sagaMiddleware);
    }
});

sagaMiddleware.run(profileSaga);

export type AppStore = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch