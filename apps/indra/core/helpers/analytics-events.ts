export const AnalyticsEvents = {
	BUTTON_CLICK: { name: 'button_click' },
	PAGE_VIEW: { name: 'page_view' },
	FORM_SUBMIT: { name: 'form_submit' },
	SIDEBAR_CLICK: { name: 'sidebar_click' },
	EDIT_CATALOUGE_PRODUCT: { name: 'edit_catalouge_product' },
	EDIT_BANNER: { name: 'edit_banner' },
};

export type IAnalyticsEventName = keyof typeof AnalyticsEvents;
