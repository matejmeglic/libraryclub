from django.shortcuts import render, get_object_or_404
from .models import Book, Reader
import os
from datetime import date
from django.http.response import JsonResponse, HttpResponse
from django.conf import settings
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.generic.base import TemplateView


def index(request):
    # get data from db
    query_books = Book.objects.order_by("date_read")
    query_readers = Reader.objects.distinct()

    books = []
    readers_dict = []
    books_per_reader = []
    readers_cumulative = []

    # Transform data for graphs
    for reader in query_readers:
        readers_dict.append({"reader": str(reader.name)})

    for book in query_books:
        books.append(
            {
                "date_read": book.date_read,
                "reader": str(book.reader),
                "author": book.author,
                "name": book.name,
                "description": book.description,
            }
        )

    for reader in readers_dict:
        readers_collection = []
        count = 0
        previous_date = date(2000, 1, 1)
        for book in books:
            if book.get("reader") == reader.get("reader"):
                if count == 0:
                    days_from_last_book = 0
                    previous_date = book.get("date_read")
                else:
                    days_from_last_book = (book.get("date_read") - previous_date).days
                count += 1

                previous_date = book.get("date_read")
                readers_collection.append(
                    {
                        "date_read": book.get("date_read"),
                        "reader": book.get("reader"),
                        "author": book.get("author"),
                        "name": book.get("name"),
                        "description": book.get("description"),
                        "days_from_last_book": days_from_last_book,
                    }
                )
        books_per_reader.append(
            {"reader": reader.get("reader"), "books_read": readers_collection}
        )
        readers_cumulative.append({"reader": reader.get("reader"), "books_read": count})

    all_data = {
        "books": books,
        "books_per_reader": books_per_reader,
        "readers_cumulative": readers_cumulative,
        "readers_dict": readers_dict,
    }
    context = {"all_data": all_data}

    return render(request, "index.html", {"context": context})