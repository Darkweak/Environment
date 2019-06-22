import decode from 'jwt-decode';

const isWindow = () => typeof window !== 'undefined';
export const resetForm = () => document.getElementsByTagName('form')[0].reset();

const CATEGORIES = 'categories';
const TOKEN = 'token';
const THEME = 'theme';
export const getToken: any = () => isWindow() && (window.localStorage.getItem(TOKEN) || null);
export const setToken: any = (token: string) => isWindow() && window.localStorage.setItem(TOKEN, token);
export const deleteToken: any = () => isWindow() && window.localStorage.removeItem(TOKEN);
export const getDecodedToken: any = () => getToken() && decode(getToken());
export const getUsername: any = () => getToken() && getDecodedToken().username;
export const getId: any = () => getToken() && getDecodedToken().id;

export const getTheme: any = () =>isWindow() && (window.localStorage.getItem(THEME) || '{"backgroundTheme": "primary", "textTheme": "secondary"}');
export const setTheme: any = (theme: string) => isWindow() && window.localStorage.setItem(THEME, theme);
export const getBackgroundTheme: any = () => getTheme() && JSON.parse(getTheme()).backgroundTheme;
export const getTextTheme: any = () => getTheme() && JSON.parse(getTheme()).textTheme;

export const getCategories: any = () =>isWindow() && (window.localStorage.getItem(CATEGORIES) || '[]');
export const setCategories: any = (categories: string) => isWindow() && window.localStorage.setItem(CATEGORIES, categories);
