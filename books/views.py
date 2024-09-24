from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from .models import Book
import json

@csrf_exempt
def book_list(request):
    if request.method == 'GET':
        books = Book.objects.all().values()
        return JsonResponse(list(books), safe=False)
    
    elif request.method == 'POST':
        data = json.loads(request.body)
        book = Book.objects.create(
            title=data['title'],
            author=data['author'],
            publication_date=data['publication_date']
        )
        return JsonResponse({"id": book.id, "message": "Book created successfully"}, status=201)

@csrf_exempt
def book_detail(request, pk):
    book = get_object_or_404(Book, pk=pk)
    
    if request.method == 'GET':
        data = {"id": book.id, "title": book.title, "author": book.author, "publication_date": book.publication_date}
        return JsonResponse(data)
    
    elif request.method == 'PUT':
        data = json.loads(request.body)
        book.title = data.get('title', book.title)
        book.author = data.get('author', book.author)
        book.publication_date = data.get('publication_date', book.publication_date)
        book.save()
        return JsonResponse({"message": "Book updated successfully"})
    
    elif request.method == 'DELETE':
        book.delete()
        return JsonResponse({"message": "Book deleted successfully"}, status=204)