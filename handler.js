const {nanoid} = require('nanoid');
const data = require('./data');

const addNewData = (request, h) => {
  const {name, year, author, summary, publisher,
    pageCount, readPage, reading} = request.payload;
  const id = nanoid(16);
  const finished = false;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  if (name == null) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      // eslint-disable-next-line max-len
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  const newData = {
    id, name, year, author, summary, publisher, pageCount, readPage,
    finished, reading, insertedAt, updatedAt,
  };
  // console.log(newData);

  data.push(newData);

  const isSuccess = data.filter((newData) => newData.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);
  return response;
};

const viewAllData = (request, h) => {
  const books = [];
  // console.log(newData);
  data.forEach((data) => {
    const id = data.id;
    const name = data.name;
    const publisher = data.publisher;
    const newData = {id, name, publisher};
    // console.log(newData);

    books.push(newData);
  });
  const response = h.response({
    'status': 'success',
    'data': {
      books,
    },
  });
  response.code(200);
  return response;
};

const databyId = (request, h) => {
  const {bookId} = request.params;
  const bookSearch = data.find((data) => data.id == bookId);
  // console.log(bookSearch);

  if (bookSearch !== undefined) {
    const response = h.response({
      status: 'success',
      data: {
        book: bookSearch,
      },
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};

const editbyId = (request, h) => {
  const {id} = request.params;
  const bookSearch = data.find((data) => data.id == id);
  const {name, year, author, summary, publisher,
    pageCount, readPage, reading} = request.payload;
  console.log(bookSearch);

  if (name == null) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      // eslint-disable-next-line max-len
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }
  if (bookSearch !== undefined) {
    let idfind = 0;
    data.forEach((item, index) => {
      if (item.id == id) {
        idfind = index;
      }
    });
    const insertedAt = bookSearch.insertedAt;
    const updatedAt = bookSearch.updatedAt;
    const finished = bookSearch.finished;
    // eslint-disable-next-line max-len
    const newData = {id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt};
    console.log(newData);
    data.splice(idfind, 1, newData);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

const deletebyId = (request, h) => {
  const {bookId} = request.params;
  const bookSearch = data.find((data) => data.id == bookId);
  let idfind = -1;
  data.forEach((item, index) => {
    if (item.id == bookSearch.id) {
      idfind = index;
    }
  });
  data.splice(idfind, 1);
  if (idfind > -1) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {addNewData, viewAllData, databyId, editbyId, deletebyId};
