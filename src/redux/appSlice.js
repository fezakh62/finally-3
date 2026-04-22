import { createSlice } from '@reduxjs/toolkit'
import { getSavedValue } from '../utils/storage'

const initialState = {
  themeDark: getSavedValue('pixema-dark', true),
  favorites: getSavedValue('pixema-favorites', []),
  profile: getSavedValue('pixema-profile', {
    name: 'Fedor Zakharov',
    email: 'f.zakharov302@gmail.com',
  }),
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setThemeDark(state, action) {
      state.themeDark = action.payload
    },
    setFavorites(state, action) {
      state.favorites = action.payload
    },
    setProfile(state, action) {
      state.profile = action.payload
    },
  },
})

export const { setThemeDark, setFavorites, setProfile } = appSlice.actions
export default appSlice.reducer
