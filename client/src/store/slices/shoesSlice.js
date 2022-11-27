import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  types: [],
  brands: [],
  shoes: [],
  sizes: "",
  selectedType: {},
  selectedBrand: {},
  page: 1,
  totalCount: 0,
  limit: 3,
};

export const shoesSlice = createSlice({
  name: "shoes",
  initialState,
  reducers: {
    setTypes: (state, action) => {
      state.types = action.payload;
    },
    setBrands: (state, action) => {
      state.brands = action.payload;
    },
    setShoes: (state, action) => {
      state.shoes = action.payload;
    },
    setSelectedType: (state, action) => {
      setPage(1);
      state.selectedType = action.payload;
    },
    setSelectedBrand: (state, action) => {
      setPage(1);
      state.selectedBrand = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setTotalCount: (state, action) => {
      state.totalCount = action.payload;
    },
    setSizes: (state, action) => {
      state.sizes = action.payload;
    },
  },
});

export const {
  setTypes,
  setBrands,
  setShoes,
  setSelectedType,
  setSelectedBrand,
  setPage,
  setTotalCount,
  setSizes,
} = shoesSlice.actions;

export default shoesSlice.reducer;
