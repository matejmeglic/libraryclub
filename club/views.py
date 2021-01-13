from django.shortcuts import render, get_object_or_404
from .models import Book, Reader
import os
from django.http.response import JsonResponse, HttpResponse
from django.conf import settings
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.generic.base import TemplateView


def index(request):
    books = Book.objects.order_by("-date_read")

    data = []
    reader = []

    # Transform data for graphs
    for element in books:
        # all data presented
        data.append(
            {
                "reader": str(element.reader),
                "date_read": element.date_read,
                "author": element.author,
                "name": element.name,
                "description": element.description,
            }
        )

        reader.append(str(element.reader))

    context = {"data": data, "reader": reader}

    return render(request, "index.html", {"context": context})