from . import views
from django.urls import path

urlpatterns = [
    path('signup/', views.UserSignupView.as_view(), name='signup'),
    path("login/", views.UserLoginView.as_view(), name="login"),
    path('admin/login/', views.AdminLoginView.as_view(), name='admin-login'),
    path('users/', views.UserListView.as_view(), name='user-list'),
]
