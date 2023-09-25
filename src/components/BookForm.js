import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

const BookForm = (props) => {
  const [book, setBook] = useState(() => {
    return {
      bookname: props.book ? props.book.bookname : '',
      author: props.book ? props.book.author : '',
      state: props.book ? props.book.state : '',
      date: props.book ? props.book.date : ''
    };
  });

  const [errorMsg, setErrorMsg] = useState('');
  const { bookname, author, state, date } = book;

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const values = [bookname, author, state, date];
    let errorMsg = '';

    const allFieldsFilled = values.every((field) => {
      const value = `${field}`.trim();
      return value !== '' && value !== '0';
    });

    if (allFieldsFilled) {
      const book = {
        id: uuidv4(),
        bookname,
        author,
        state,
        date
      };
      props.handleOnSubmit(book);
    } else {
      errorMsg = 'Por favor, rellene todos los campos.';
    }
    setErrorMsg(errorMsg);
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      default:
        setBook((prevState) => ({
          ...prevState,
          [name]: value
        }));
    }
  };
  return (
    <div className="main-form">
      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
      <Form onSubmit={handleOnSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Titulo del libro</Form.Label>
          <Form.Control
            className="input-control"
            type="text"
            name="bookname"
            value={bookname}
            placeholder="Ingrese el nombre del libro"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="author">
          <Form.Label>Autor del Libro</Form.Label>
          <Form.Control
            className="input-control"
            type="text"
            name="author"
            value={author}
            placeholder="Ingrese el nombre del autor"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="quantity">
          <Form.Label>Fecha de publicacion</Form.Label>
          <Form.Control
            className="input-control"
            type="date"
            name="date"
            value={date}
            placeholder="Ingrese la fecha de publicacion (Día/Mes/Año)"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="estado">
          <Form.Label>Estado</Form.Label>
          <Form.Control
            className="input-control"
            type="text"
            name="state"
            value={state}
            placeholder="Ingrese el estado actual del libro (Disponible/Dañado/Perdido/Prestado)"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="submit-btn">
          Enviar
        </Button>
      </Form>
    </div>
  );
};

export default BookForm;
