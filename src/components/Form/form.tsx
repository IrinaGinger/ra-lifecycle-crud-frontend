import { useState } from 'react';

import { IForm, IFormProps } from '../../interfaces';

import './form.css';

export default function Form(props: IFormProps) {
    const { onSubmit: handleSubmit } = props;

    const [form, setForm] = useState<IForm>({
        content: '',
    });

    function handleFormChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        const { name, value } = e.target;

        setForm(prevForm => ({ ...prevForm, [name]: value }));
    }

    return (
        <form
            className="form"
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                handleSubmit(form);
                setForm({ content: '' });
            }}
        >
            <div className="form-field">
                <label htmlFor="content">New note</label>
                <textarea
                    className="form-content"
                    id="content"
                    name="content"
                    required
                    value={form.content}
                    onChange={handleFormChange}
                />
            </div>
            <button
                className="form-button"
                type="submit"
            >
                &#10148;
            </button>
        </form>
    );
}
