from django.shortcuts import render
from transactions.models import Transaction

# Create your views here.
def home_view(request, *args, **kwargs):
    transactions = Transaction.objects.all()
    context = {
        'transactions': transactions
    }
    return render(request, "index.html", context)

def edit_view(request, *args, **kwargs):
    return render(request, "edit.html", {})

def create_view(request, *args, **kwargs):
    return render(request, "create.html", {})
