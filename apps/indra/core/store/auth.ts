import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

type AuthState = {
	cod_payment: number | null;
	credit_payment: number | null;
	district_id: number | null;
	email: string;
	exp: number;
	iat: number;
	indifi_id: number | null;
	loading: boolean;
	loggedIn: boolean;
	name: string;
	pad_payment: number | null;
	phone_number: number;
	pincode: number | null;
	role: string;
	seller_id: number | null;
	store_category: string | null;
	store_type: string | null;
	user_id: number;
	username: string;
	zone: string | null;
};

const initialState: AuthState = {
	cod_payment: null,
	credit_payment: null,
	district_id: null,
	email: '',
	exp: 0,
	iat: 0,
	indifi_id: null,
	loading: false,
	loggedIn: false,
	name: '',
	pad_payment: null,
	phone_number: 0,
	pincode: null,
	role: '',
	seller_id: null,
	store_category: null,
	store_type: null,
	user_id: 0,
	username: '',
	zone: null,
};

type AuthenticatePayload = {
	token: string;
};

type JwtPayload = Partial<AuthState>;

export const authenticateUser = createAsyncThunk(
	'auth/authenticateUser',
	async ({ token }: AuthenticatePayload, { dispatch }) => {
		const userDetails = jwtDecode<JwtPayload>(token);
		dispatch(
			updateUser({
				loggedIn: true,
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
