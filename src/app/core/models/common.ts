export enum Common {
}

export enum RouteConstants {
    LOGIN = 'login',
    SIGNUP = 'signup',
    DASHBOARD = 'dashboard',
    SETTINGS = 'settings',
    PROFILE = 'profile',
    HOME = '',
    NOT_FOUND = 'not-found',
    FORBIDDEN = 'forbidden',
    ABOUT = 'about',
    EMPTY = ''
}

export enum StorageKey {
    AT = "accessToken",
    RT = "rfToken",
}

export enum APIEndpoints {
    LOGIN = 'auth/login',
    SIGNUP = 'auth/signup',
    LOGOUT = 'auth/logout',
    USER_PROFILE = 'user/profile',
    UPDATE_PROFILE = 'user/update-profile',
    CHANGE_PASSWORD = 'user/change-password',
    GET_LANGUAGES = '/api/languages',
    SET_LANGUAGE = 'languages/set',
    GET_TRANSLATIONS = '/api/translations',
    UPDATE_TRANSLATION = 'translations/update'
}