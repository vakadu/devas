export enum API_ENDPOINTS {
	GET_CATEGORIES = 'categories',
	GET_PRODUCTS = 'products/v2/getProducts',
	GET_PRODUCT_DETAILS = 'products/v2/productDetail',
	UPDATE_LAT_LNG = 'locations/latlng',
	GET_OTP = 'user/seller/generateOtp',
	SUGGESTIONS = 'discovery/suggestions',
	TRENDING_SUGGESTIONS = 'search-analytics/top-searches?pageSize=6',
	LOGIN = 'user/seller/login',
	CART_COUNT = 'gostor/v2/cart/count',
	REFRESH_TOKEN = '/user/seller/refresh_token',
	GET_CART = 'gostor/orders/v2/summary?cta=CART',
	UPDATE_CART = 'gostor/v2/cart?isKiosk=false',
}
