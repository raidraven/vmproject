from turtle import update
from django.urls import path 
from .views import DataDetail, DataList, DataCreate, DataDelete, DataUpdate
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('list/', DataList.as_view(), name='list'),
    path('detail/<int:pk>/', DataDetail.as_view(), name='detail'),
    path('create/', DataCreate.as_view(), name='create'),
    path('delete/<int:pk>', DataDelete.as_view(), name='delete'),
    path('update/<int:pk>', DataUpdate.as_view(), name='update'),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)