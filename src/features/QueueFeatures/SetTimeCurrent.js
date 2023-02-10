import { createSlice } from "@reduxjs/toolkit"

let initialState = JSON.parse(localStorage.getItem("blackcat_timeCurrent")) || {
   currentTimes: 0,
}
export const currentTimes = createSlice({
   name: "currentTimes",
   initialState,
   reducers: {
      setCurrentTimes: (state, action) => {
         state.currentTime = action.payload
         localStorage.setItem("blackcat_timeCurrent", JSON.stringify(state))
      },
      setCurrentTime0: (state, action) => {
         state.currentTime = 0
         localStorage.setItem("blackcat_timeCurrent", JSON.stringify(state))
      },
   },
})

export const { setCurrentTimes } = currentTimes.actions

export default currentTimes.reducer
