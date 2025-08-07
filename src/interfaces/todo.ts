
export interface ITodo {
    id?: number;
    text: string;
    status: boolean;
    category: string;
}

export interface ITodoReq {
    id?: number;
    text: string;
    category: string;
}