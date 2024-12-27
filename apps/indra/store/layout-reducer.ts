import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	loginSidebar: false,
	loading: false,
};

export const layoutSlice = createSlice({
	name: 'layout',
	initialState,
	reducers: {
		handleLoginSidebar: (state, action) => {
			state.loginSidebar = action.payload;
		},
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
	},
});

export const { handleLoginSidebar, setLoading } = layoutSlice.actions;

export default layoutSlice.reducer;
