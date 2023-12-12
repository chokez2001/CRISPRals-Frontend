import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { persistStore, persistReducer } from 'redux-persist'
import rootReducer, { rootPersistConfig } from './rootReducer'

// ----------------------------------------------------------------------

export type IRootState = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch

const store = configureStore({
    reducer: persistReducer(rootPersistConfig, rootReducer),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
            immutableCheck: false,
        }),
})

const persistor = persistStore(store)

const { dispatch } = store

const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector

const useAppDispatch = () => useDispatch<AppDispatch>()

export { store, persistor, dispatch, useAppSelector, useAppDispatch }
