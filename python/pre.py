import random
a=[0]*100000
for i in range(99999,0,-1):
    s = random.randint(0,100)
    a[i]=s
    b={}
    for j in range(10):
        b[j]=s
