import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

type AuthState = {
	loading: boolean;
	loggedIn: boolean;
	userId?: null | string;
	mobile?: null | string;
	name?: string;
	active?: boolean;
	gender?: string;
	role?: null | string;
	clinicIds?: string[];
	createdAt?: string;
	updatedAt?: string;
	iat?: number;
	exp?: number;
	subscription?: null | IAuthTypes.ISubscription;
	accessToken: string | null;
	refreshToken: string | null;
};

const initialState: AuthState = {
	loading: false,
	loggedIn: false,
	accessToken: null,
	refreshToken: null,
};

type AuthenticatePayload = {
	accessToken: string;
	refreshToken: string;
};

type JwtPayload = Partial<AuthState>;

export const authenticateUser = createAsyncThunk<void, AuthenticatePayload>(
	'auth/authenticateUser',
	async ({ accessToken, refreshToken }, { dispatch }) => {
		const userDetails = jwtDecode<JwtPayload>(accessToken);
		dispatch(
			updateUser({
				loggedIn: true,
				accessToken,
				refreshToken,
				...userDetails,
			})
		);
	}
);

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		updateUser: (state, action: PayloadAction<Partial<AuthState>>) => {
			Object.assign(state, action.payload);
		},
		resetUser: (state) => {
			Object.assign(state, initialState);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(authenticateUser.pending, (state) => {
				state.loading = true;
			})
			.addCase(authenticateUser.fulfilled, (state) => {
				state.loading = false;
			})
			.addCase(authenticateUser.rejected, (state) => {
				state.loading = false;
			});
	},
});

export const { updateUser, resetUser } = authSlice.actions;

export default authSlice.reducer;
