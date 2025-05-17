export interface Language {
    id: number;
    code: string;
    name: string;
    flag: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface LanguageTranslation {
    id: number;
    languageId: number;
    key: string;
    value: string;
    createdAt: Date;
    updatedAt: Date;
} 