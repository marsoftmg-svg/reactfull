import { createSlice } from '@reduxjs/toolkit';
import { productsData } from '../data/mockData';



const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items:          productsData,
    filterCategory: 'all',     // 'all' | 'Elektronika' | 'Odziez' | ...
    sortBy:         'name',    // 'name' | 'price' | 'sold'
    sortDir:        'asc',     // 'asc' | 'desc'
    searchQuery:    '',
  },
  reducers: {
    setFilter(state, action) {
      state.filterCategory = action.payload;
    },
    setSort(state, action) {
      const { sortBy, sortDir } = action.payload;
      state.sortBy  = sortBy;
      state.sortDir = sortDir;
    },
    setSearch(state, action) {
      state.searchQuery = action.payload;
    },
  },
});
 
// Selector – filtrowanie + sortowanie w jednym miejscu
export const selectFilteredProducts = state => {
  const { items, filterCategory, sortBy, sortDir, searchQuery } = state.products;
 
  let result = items
    .filter(p => filterCategory === 'all' || p.category === filterCategory)//wszystko lub wg kategorii
    .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
 
  result.sort((a, b) => {
    const valA = a[sortBy];
    const valB = b[sortBy];
    if (typeof valA === 'string') {
      return sortDir === 'asc'
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    }
    return sortDir === 'asc' ? valA - valB : valB - valA;
  });
 
  return result;
};
 
export const { setFilter, setSort, setSearch } = productsSlice.actions;
export default productsSlice.reducer;