import random
a=[]
for i in range(100000000):
    s = random.randint(0,100)
    a.append(s)
    b={}
    for j in range(10):
        b[j]=s
print('done')
