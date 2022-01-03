from django.contrib import admin

from . import models

from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User


class TeamInline(admin.StackedInline):
    model = models.TeamUser
    verbose_name_plural = "Teams"


class UserAdmin(BaseUserAdmin):
    inlines = (TeamInline,)


admin.site.unregister(User)
admin.site.register(User, UserAdmin)


@admin.register(models.Season)
class SeasonAdmin(admin.ModelAdmin):
    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        team = models.TeamUser.objects.filter(user=request.user)
        if team[0].team == None:
            ""
        else:
            if db_field.name == "team":
                kwargs["queryset"] = models.Team.objects.filter(team_name=team[0].team)
        return super().formfield_for_foreignkey(db_field, request, **kwargs)

    def get_queryset(self, request):
        qs = super(SeasonAdmin, self).get_queryset(request)
        team = models.TeamUser.objects.filter(user=request.user)

        if team[0].team == None:
            result = qs
        else:
            result = qs.filter(team__team_name=team[0].team)
        return result

    list_display = ("season_name", "team", "season_start", "season_end", "is_active")
    ordering = (
        "is_active",
        "season_name",
    )


@admin.register(models.Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ["team_name"]


@admin.register(models.Book)
class BookAdmin(admin.ModelAdmin):
    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        team = models.TeamUser.objects.filter(user=request.user)
        if team[0].team == None:
            ""
        else:
            if db_field.name == "reader":
                kwargs["queryset"] = models.Reader.objects.filter(team=team[0].team)
        return super().formfield_for_foreignkey(db_field, request, **kwargs)

    def get_queryset(self, request):
        qs = super(BookAdmin, self).get_queryset(request)
        team = models.TeamUser.objects.filter(user=request.user)
        if team[0].team == None:
            ""
        else:
            readers = models.Reader.objects.filter(team=team[0].team)
            qs = qs.filter(reader__in=readers)
        return qs

    list_display = ("date_read", "reader", "name", "author", "genre")
    ordering = ("-date_read",)


@admin.register(models.Reader)
class ReaderAdmin(admin.ModelAdmin):
    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        team = models.TeamUser.objects.filter(user=request.user)
        if team[0].team == None:
            ""
        else:
            if db_field.name == "team":
                kwargs["queryset"] = models.Team.objects.filter(team_name=team[0].team)
        return super().formfield_for_foreignkey(db_field, request, **kwargs)

    def get_queryset(self, request):
        qs = super(ReaderAdmin, self).get_queryset(request)
        team = models.TeamUser.objects.filter(user=request.user)

        if team[0].team == None:
            result = qs
        else:
            result = qs.filter(team__team_name=team[0].team)

        return result

    list_display = ("name", "team")
