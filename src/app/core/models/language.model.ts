export interface Language {
    id: string;
    name: string;
    flag: string;
    isActive: boolean;
}

export interface LanguageTranslation {
    id: number;
    languageCode: string;
    key: string;
    value: string;
    module: string;
} 