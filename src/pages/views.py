from django.shortcuts import render
from transactions.models import Transaction
from django.core.serializers.json import DjangoJSONEncoder
import json

# Create your views here.
def home_view(request, *args, **kwargs):
    transactions = Transaction.objects.all()
    transactions_list = transactions.values_list('id', 'title', 'description', 'amount', 'type', 'date')
    transactions_json = json.dumps(list(transactions_list), cls=DjangoJSONEncoder)
    print(transactions_json)
    context = {
        'transactions': transactions,
        'transactions_json': transactions_json
    }
    return render(request, "index.html", context)

def edit_view(request, *args, **kwargs):
    return render(request, "edit.html", {})

def create_view(request, *args, **kwargs):
    return render(request, "create.html", {})
