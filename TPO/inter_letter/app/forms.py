from django import forms
from .models import requests

class RequestsForm(forms.ModelForm):
    class Meta:
        model = requests
        exclude = ['student_id','last_modified']

    def __init__(self, *args, **kwargs):
            super().__init__(*args, **kwargs)
            self.fields['dob'].widget = forms.DateInput(attrs={'type': 'date'})
