import { combineReducers } from 'redux'
import createWebStorage from 'redux-persist/lib/storage/createWebStorage'
import filtersSlice from './slices/filtersSlice'
import dialogSlice from './slices/dialogSlice'

export const createNoopStorage = () => ({
    getItem(_key: string) {
        return Promise.resolve(null)
    },
    setItem(_key: string, value: any) {
        return Promise.resolve(value)
    },
    removeItem(_key: string) {
        return Promise.resolve()
    },
})

export const storage =
    typeof window !== 'undefined'
        ? createWebStorage('local')
        : createNoopStorage()

export const rootPersistConfig = {
    key: 'root',
    storage,
    keyPrefix: 'redux-',
    whitelist: ['account'],
}

const rootReducer = combineReducers({
    filters: filtersSlice,
    dialog: dialogSlice,
})

export default rootReducer
