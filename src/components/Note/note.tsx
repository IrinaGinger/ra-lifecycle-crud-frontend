import { INoteProps } from '../../interfaces';

import './note.css';

export default function Note(props: INoteProps) {
    const {
        id,
        content,
        onDeleteClick: handleDelete,
    } = props;
    
    return (
        <div className="note" id={id}>
            <p>{content}</p>
            <button type="submit" className="delete-button" onClick={handleDelete}>&times;</button>  
        </div>
    );
}
