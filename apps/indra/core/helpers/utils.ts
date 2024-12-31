import { store } from '../store';
import { resetUser } from '../store/auth';

export const logout = () => {
	localStorage.removeItem('persist:root');
	store.dispatch(resetUser());
};
