import { store } from '../store';
import { resetUser } from '../store/auth';

export const logout = () => {
	localStorage.removeItem('persist:root');
	store.dispatch(resetUser());
};

export const createFormDataForImage = (
	photo: File,
	keyName: string,
	body?: Record<string, any>
) => {
	const data = new FormData();
	data.append(keyName, photo);

	if (body) {
		for (const key in body) {
			if (Object.prototype.hasOwnProperty.call(body, key)) {
				const value = body[key];
				// Append only non-null, non-undefined, non-empty values
				if (value !== null && value !== undefined && value !== '') {
					data.append(key, value);
				}
			}
		}
	}

	return data;
};

export const createFormDataForDocument = (
	document?: File,
	keyName?: string | null,
	body?: Record<string, any>
) => {
	const data = new FormData();
	if (keyName && document) {
		data.append(keyName, document);
	}

	if (body) {
		for (const key in body) {
			if (Object.prototype.hasOwnProperty.call(body, key)) {
				const value = body[key];
				// Check if the value is not null, undefined, or an empty string
				if (value !== null && value !== undefined && value !== '') {
					data.append(key, value);
				}
			}
		}
	}

	return data;
};
