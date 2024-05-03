from django.contrib import admin
from django.urls import path
from myapp import views

urlpatterns = [
    path('',views.main_page, name="main_page"),
    path('score_card',views.score_card, name="score_card")
    ]
