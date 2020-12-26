from django.shortcuts import render
from transactions.models import Transaction
from django.core.serializers.json import DjangoJSONEncoder
import json

# Create your views here.
def home_view(request, *args, **kwargs):
    transactions = Transaction.objects.all()
    transactions_list = to_dict(transactions)
    transactions_json = json.dumps(transactions_list)
    context = {
        'transactions': transactions_json
    }
    return render(request, "index.html", context)

def get_transactions_by_month(month):
    return

def to_dict(queryset):
    l = dict()
    for object in queryset:
        temp = dict()
        temp["title"] = object.title
        temp["description"] = object.description
        temp["amount"] = str(object.amount)
        temp["type"] = object.type
        temp["date"] = str(object.date)
        l[str(object.id)] = temp
    print(l)
    return l