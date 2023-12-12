import { createSlice, SliceCaseReducers, PayloadAction } from '@reduxjs/toolkit'

export interface IDIALOG {
    open: boolean
    assembly: string
}

const initialState: IDIALOG = {
    open: false,
    assembly: '',
}

export const dialogSlice = createSlice<IDIALOG, SliceCaseReducers<IDIALOG>>({
    name: 'dialog',
    initialState,
    reducers: {
        setDialog: (state, { payload }: PayloadAction<IDIALOG>) => {
            state.assembly = payload.assembly
            state.open = !state.open
        },
    },
})

export const { setDialog } = dialogSlice.actions

export default dialogSlice.reducer
