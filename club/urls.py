from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("<str:team>", views.index, name="index"),
    path("<str:team>/<str:season>", views.index, name="index"),
    path("<str:team>/<str:season>/<str:import>", views.index, name="index"),
]
