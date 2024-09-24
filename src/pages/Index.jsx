import React from 'react';
import BookStore from '../components/BookStore';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8">
        <BookStore />
      </div>
    </div>
  );
};

export default Index;
