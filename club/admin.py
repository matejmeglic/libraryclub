from django.contrib import admin

from . import models


@admin.register(models.Season)
class BookAdmin(admin.ModelAdmin):
    list_display = ("season_name", "team", "season_start", "season_end", "is_active")
    ordering = (
        "is_active",
        "season_name",
    )


@admin.register(models.Team)
class ReaderAdmin(admin.ModelAdmin):
    list_display = ("team_name",)


@admin.register(models.Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ("date_read", "reader", "name", "author")
    ordering = ("date_read",)


@admin.register(models.Reader)
class ReaderAdmin(admin.ModelAdmin):
    list_display = ("name", "started_reading")
