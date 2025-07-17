export interface ApiResponse <T = any> {
    status: number;
    message: string;
    data?: T;
    error?: string;
}