export interface IForm {
    content: string,
}

export interface IFormProps {
    onSubmit: (form: IForm) => void,
}

export interface INote {
    id: string,
    content: string,
}

export interface INoteProps {
    id: string,
    content: string,
    onDeleteClick: (e: React.MouseEvent<HTMLButtonElement>) => void,
}

export interface IRequestOptions {
    method: string,
    headers: Headers | Record<string, string>,
    body?: string,
};
