def secondSmallest(S, D):
    print(S,D)
    smallest=[]
    for i in range(D):
        if i!=D-1:
            if S>9:
                smallest.append(9)
                S-=9
                continue
            elif 1<S:
                smallest.append(S-1)
                S=1
            else:
                smallest.append(0)
        else:
            smallest.append(S)
    N=0
    print(smallest[::1])
    d=True
    i=0
    while i<D-1 and d:
        if smallest[i]==9 and smallest[i+1]!=9:
            smallest[i]-=1
            smallest[i+1]+=1
            d=False
        i+=1
    if d:
        print(smallest[::])
        for i in range(D):
            if smallest[i]!=0:
                N+=pow(10,i)*smallest[i]
        if len(str(N+9))>D:
            return -1
        return N+9        
    print(smallest[::1])
    for i in range(D):
        if smallest[i]!=0:
            N+=pow(10,i)*smallest[i]
    return N
print(secondSmallest(45, 3))