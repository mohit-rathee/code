def inverse(x,mod):
    return pow(x, mod - 2, mod)

def bestNumbers(N,A,B,C,D):
    best=0
    M=1000000007
    for i in range(N+1):
        sum=A*i+B*(N-i)
        d=True
        FacN=[1]*(N+1)
        # FacN=[1!,2!,3!,4!...(N+1)!]
        for j in range(2,N+1):
            FacN[j]=(FacN[j-1]*j)%M
        for x in str(sum):
            if int(x)==C or int(x)==D:
                continue
            d=False
        if d:
            best=(best+ FacN[N]*inverse(FacN[i],M)*inverse(FacN[N-i],M))%M
    print(FacN)
    return int(best)
           
# print(bestNumbers(9,4,7,5,7))
print(bestNumbers(1024,5,10,5,10239))