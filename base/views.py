from django.shortcuts import render


def home(request):
    return render(request, 'base/home.html', {'title':'Home'})
    
def about(request):
    return render(request, 'base/about.html', {'title':'About'})
    
def contact(request):
    return render(request, 'base/contact.html', {'title':'Contact'})