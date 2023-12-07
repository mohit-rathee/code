import random
a=[0]*100000000 
for i in range(100000000):
    s = random.randint(0,100)
    a[i]=s
    b={}
    for j in range(10):
        b[j]=s
