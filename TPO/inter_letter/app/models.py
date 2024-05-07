from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator, RegexValidator

BRANCH_CHOISES = [
    ('Computer Science and Engineering','Computer Science and Engineering'),
    ('Electronics and Communication Engineering','Electronics and Communication Engineering'),
    ('Mechanical Engineering','Mechanical Engineering'),
    ('Electrical Engineering','Electrical Engineering'),
    ('Biotechnology Engineering','Biotechnology Engineering'),
    ('Civil Engineering','Civil Engineering')
]

class requests(models.Model):
    student_id = models.AutoField(primary_key=True)
    dob = models.DateField()
    student_name = models.CharField(max_length=100)
    branch = models.CharField(max_length=41, choices=BRANCH_CHOISES)
    semester = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(8)])
    roll_no = models.IntegerField()
    email = models.EmailField()
    father_name = models.CharField(max_length=100)
    phone_no = models.CharField(max_length=10,validators=[RegexValidator(regex='^[0-9]{10}$')])
    last_modified = models.DateTimeField(auto_now_add=True)

