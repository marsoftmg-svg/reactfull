import { createSlice } from '@reduxjs/toolkit';
 
const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    darkMode:     false,
    newOrders:    7,          // badge w Sidebar
    selectedRange: '12m',      // filtr zakresu dat: '3m'|'6m'|'12m'
    isLoading:    false,
  },
  reducers: {
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
    },
    setSelectedRange(state, action) {
      state.selectedRange = action.payload;  // '3m' | '6m' | '12m'
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    markOrdersRead(state) {
      state.newOrders = 0;
    },
  },
});
 
export const {
  toggleDarkMode,
  setSelectedRange,
  setLoading,
  markOrdersRead,
} = dashboardSlice.actions;
 
export default dashboardSlice.reducer;