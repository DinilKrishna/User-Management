from . import views
from django.urls import path
from .views import UserSignupView

urlpatterns = [
    path('signup/', views.UserSignupView.as_view(), name='signup'),
]