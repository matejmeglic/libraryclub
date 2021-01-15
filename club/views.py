from django.shortcuts import render
from .models import Book, Reader
import os
from datetime import date, timedelta


def index(request):
    # get data from db
    query_books = Book.objects.order_by("date_read")
    query_readers = Reader.objects.distinct()

    books = []
    readers_dict = []
    books_per_reader = []
    readers_cumulative = []

    # Transform data for graphs
    # readers dict
    for reader in query_readers:
        readers_dict.append({"reader_id": reader.id, "reader": reader.name})

    # books dict
    for book in query_books:
        books.append(
            {
                "date_read": book.date_read,
                "id": book.id,
                "reader_id": book.reader_id,
                "reader": str(book.reader),
                "author": book.author,
                "name": book.name,
                "description": book.description,
            }
        )

    # create readers collection
    for reader in readers_dict:
        readers_collection = []
        count = 0
        days_from_last_book = 0
        previous_date = date(2000, 1, 1)
        for book in books:
            if book.get("reader_id") == reader.get("reader_id"):
                if count == 0:
                    previous_date = book.get("date_read")
                else:
                    days_from_last_book = (book.get("date_read") - previous_date).days
                count += 1

                previous_date = book.get("date_read")
                readers_collection.append(
                    {
                        "date_read": book.get("date_read"),
                        "id": book.get("id"),
                        "reader_id": book.get("reader_id"),
                        "reader": book.get("reader"),
                        "author": book.get("author"),
                        "name": book.get("name"),
                        "description": book.get("description"),
                        "days_from_last_book": days_from_last_book,
                    }
                )
        books_per_reader.append(
            {
                "reader_id": reader.get("reader_id"),
                "reader": reader.get("reader"),
                "books_read": readers_collection,
            }
        )
        # calculate time_avg
        avg_time = 0
        book_counter = 0
        for book in readers_collection:
            avg_time += book.get("days_from_last_book")
            book_counter += 1
        if book_counter > 0:
            calculate_avg = round(avg_time / book_counter, 1)
        else:
            calculate_avg = 0

        # calculate time_min, time_max
        min_time = 0
        max_time = 0
        for book in readers_collection:
            if min_time == 0:
                min_time = book.get("days_from_last_book")
            if max_time == 0:
                max_time = book.get("days_from_last_book")
            if book.get("days_from_last_book") < min_time:
                min_time = book.get("days_from_last_book")
            if book.get("days_from_last_book") > max_time:
                max_time = book.get("days_from_last_book")

        # get readers cumulative data
        readers_cumulative.append(
            {
                "reader_id": reader.get("reader_id"),
                "reader": reader.get("reader"),
                "books_read": count,
                "time_avg": calculate_avg,
                "time_min": min_time,
                "time_max": max_time,
            }
        )

    # books per date
    date_today = date.today()
    date_book_current = books[0].get("date_read")
    date_diff = (date_today - date_book_current).days
    date_counter = 0
    books_per_date = []

    while date_counter <= date_diff:
        book_date = []
        book_counter = 0
        for book in books:
            if date_book_current == book.get("date_read"):
                book_date.append(book)
                book_counter += 1
        books_per_date.append(
            {
                "day": date_counter,
                "date": date_book_current,
                "sum": book_counter,
                "books": book_date,
            }
        )

        date_counter += 1
        date_book_current += timedelta(days=1)

    # pack all data to context for json extraction on FE
    all_data = {
        "books": books,
        "books_per_reader": books_per_reader,
        "books_per_date": books_per_date,
        "readers_cumulative": readers_cumulative,
        "readers_dict": readers_dict,
    }
    context = {"all_data": all_data}

    return render(request, "index.html", {"context": context})