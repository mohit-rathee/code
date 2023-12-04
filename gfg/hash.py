def hash(x):
    sum=0
    A = []
    A[:0] = x
    for i in range(len(A)):
        n=ord(A[i])
        sum+=n*(pow(10,(i)))
    print(str(x)+" ==> "+str(sum))
hash("mohit")
hash("monti")
