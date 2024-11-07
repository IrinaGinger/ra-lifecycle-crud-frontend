import { useState, useEffect } from 'react';

import Note from './components/Note/note';
import Form from './components/Form/form';
import createRequest from './createRequest';

import { IForm, INote, IRequestOptions } from './interfaces';

import './App.css';

const baseURL: string = 'http://localhost:7070/';

function App() {
  const [notes, setNotes] = useState<INote[]>([]);   
  const [updated, setUpdated] = useState<boolean>(false);

  const h: Headers | Record<string, string> = new Headers();
  h.append('Content-Type', 'application/json');

  useEffect(() => {
    setUpdated(true);
  }, []);

  useEffect(() => {
    if (!updated) {
      return;
    }

    const getURL: string = `${baseURL}notes/`;
    const getParams: IRequestOptions = {
      method: 'GET',
      headers: h,
    };

    (async () => {
      const data: INote[] = await createRequest(getURL, getParams);
      {
        setNotes(data);
        setUpdated(false);
      }
    })();
  }, [updated]);

  function handleSubmit(form: IForm) {
    const postURL: string = `${baseURL}notes/`;    
    const postParams: IRequestOptions = {
      method: "post",
      headers: h,
      body: JSON.stringify({ content: form.content }),
    };

    (async () => {
      const result: number = await createRequest(postURL, postParams);
      {
        if (result === 204) {
          setUpdated(true);
        }
      }
    })();
  }

  function handleDelete(id: string) {
    const deleteURL: string = `${baseURL}notes/${id}`;
    const deleteParams: IRequestOptions = {
      method: "delete",
      headers: h,
    };

    (async () => {
      const result = await createRequest(deleteURL, deleteParams);

      if (result === 204) {
        setUpdated(true);
      }
    })();
  }

  return (
    <div className="App-container">

      <div className="notedesk">
        <h1 className="notedesk-title">Notes</h1>
        <div className="notes-container">
          {notes.map((note) => {
            return (
              <Note
                key={note.id}
                id={note.id}
                content={note.content}
                onDeleteClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault(); 
                  handleDelete(note.id);
                }}
              />
            );
          })}
        </div>
      </div>

      <Form
        onSubmit={handleSubmit}
      />
    </div>
  
  );
}

export default App;
