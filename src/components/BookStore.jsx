import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchBooks, addBook, updateBook, deleteBook } from '../api/bookApi';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const BookStore = () => {
  const [editingBook, setEditingBook] = useState(null);
  const [newBook, setNewBook] = useState({ title: '', author: '' });
  const queryClient = useQueryClient();

  const { data: books, isLoading, error } = useQuery({
    queryKey: ['books'],
    queryFn: fetchBooks,
  });

  const addMutation = useMutation({
    mutationFn: addBook,
    onSuccess: () => {
      queryClient.invalidateQueries(['books']);
      setNewBook({ title: '', author: '' });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateBook,
    onSuccess: () => {
      queryClient.invalidateQueries(['books']);
      setEditingBook(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBook,
    onSuccess: () => {
      queryClient.invalidateQueries(['books']);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingBook) {
      updateMutation.mutate({ ...editingBook, ...newBook });
    } else {
      addMutation.mutate(newBook);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Book Store</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <Input
          type="text"
          placeholder="Title"
          value={newBook.title}
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
          className="mb-2"
        />
        <Input
          type="text"
          placeholder="Author"
          value={newBook.author}
          onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
          className="mb-2"
        />
        <Button type="submit">{editingBook ? 'Update' : 'Add'} Book</Button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {books.map((book) => (
          <Card key={book.id}>
            <CardHeader>
              <CardTitle>{book.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Author: {book.author}</p>
              <div className="mt-2">
                <Button
                  onClick={() => setEditingBook(book)}
                  className="mr-2"
                  variant="outline"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => deleteMutation.mutate(book.id)}
                  variant="destructive"
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BookStore;