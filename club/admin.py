from django.contrib import admin

from . import models


@admin.register(models.Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ("date_read", "reader", "name", "author")
    ordering = ("date_read",)


@admin.register(models.Reader)
class ReaderAdmin(admin.ModelAdmin):
    list_display = ("name",)
