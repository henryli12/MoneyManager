from django.shortcuts import render
from transactions.models import Transaction
from django.core.serializers.json import DjangoJSONEncoder
import json
from django.views.decorators.http import require_http_methods
from django.http import HttpResponse

# Create your views here.
@require_http_methods(["GET", "POST"])
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
    print(y, m)
    transactions = Transaction.objects.filter(date__year=y, date__month=m)
    transactions_list = to_dict(transactions)
    transactions_json = json.dumps(transactions_list)
    return HttpResponse(transactions_json)

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
    print(l)
    return l