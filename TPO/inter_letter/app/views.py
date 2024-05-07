from django.shortcuts import render
from django.http import HttpResponse
from .forms import RequestsForm

def index(request):
    if request.method == 'POST':
        form = RequestsForm(request.POST)
        print(form)
        if form.is_valid():
            form.save()
            return HttpResponse('success_url')  # Redirect to a success page
    else:
        form = RequestsForm()
    return render(request, 'index.html', {'form': form})

def check(request,value):
    print(value)
    return HttpResponse(value)

