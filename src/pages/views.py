from django.shortcuts import render

# Create your views here.
def home_view(request, *args, **kwargs):
    return render(request, "index.html", {})

def edit_view(request, *args, **kwargs):
    return render(request, "edit.html", {})

def create_view(request, *args, **kwargs):
    return render(request, "create.html", {})
