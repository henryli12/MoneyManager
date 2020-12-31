from django.shortcuts import render
from transactions.models import Transaction
from django.core.serializers.json import DjangoJSONEncoder
import json
from django.views.decorators.http import require_http_methods
from django.http import HttpResponse

# Create your views here.
def home_view(request, *args, **kwargs):
    transactions = Transaction.objects.all()
    transactions_list = to_dict(transactions)
    transactions_json = json.dumps(transactions_list)
    context = {
        'transactions': transactions_json
    }
    return render(request, "index.html", context)

def add_transaction(request):
    print('added')
    data = list(request.POST.keys())[0]
    data = json.loads(data)
    print(data)
    transaction = Transaction(id=data['id'], title=data['title'], description=data['description'],
                              amount=data['amount'], type=data['type'], date=data['date'])
    transaction.save()
    return HttpResponse(status=204)

def get_transactions_by_month(request, month):
    y, m = month.split("-")
    expense, income = 0, 0
    transactions = Transaction.objects.filter(date__year=y, date__month=m).order_by('date')
    for t in transactions:
        if t.type == "I":
            income += t.amount
        else:
            expense += t.amount
    transactions_list = to_dict(transactions)
    data = {
        'expense': str(expense),
        'income': str(income),
        'data': transactions_list
    }
    transactions_json = json.dumps(data)
    return HttpResponse(transactions_json)

def edit_transaction(request, id):
    data = list(request.POST.keys())[0]
    data = json.loads(data)
    transaction = Transaction.objects.get(id=id)
    transaction.title = data['title']
    transaction.description = data['description']
    transaction.amount = data['amount']
    transaction.type = data['type']
    transaction.date = data['date']
    transaction.save()
    return HttpResponse(status=204)

def delete_transaction(request, id):
    transaction = Transaction.objects.get(id=id)
    transaction.delete()
    return HttpResponse(status=204)

def to_dict(queryset):
    l = dict()
    i = 0
    for object in queryset:
        temp = dict()
        temp['id'] = object.id
        temp["title"] = object.title
        temp["description"] = object.description
        temp["amount"] = str(object.amount)
        temp["type"] = object.type
        temp["date"] = str(object.date)
        l[str(i)] = temp
        i += 1
    return l