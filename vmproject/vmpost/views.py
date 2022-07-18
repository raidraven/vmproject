from dataclasses import field
from pyexpat import model
from tempfile import template
from django.shortcuts import render
from django.views.generic import ListView, DetailView, CreateView, DeleteView, UpdateView
from .models import DataModel
from django.urls import reverse_lazy

class DataList(ListView):
    template_name = 'list.html'
    model = DataModel

class DataDetail(DetailView):
    template_name = 'detail.html'
    model = DataModel

class DataCreate(CreateView):
    template_name = 'create.html'
    model = DataModel
    fields = ('title', 'content', 'category', 'images')
    success_url = reverse_lazy('list')


class DataDelete(DeleteView):
    template_name = 'delete.html'
    model = DataModel
    success_url = reverse_lazy('list')

class DataUpdate(UpdateView):
    template_name = 'update.html'
    model = DataModel
    fields = ('title','content','category')
    success_url = reverse_lazy('list')



