def Remove(s,A,t=0):
    times=t
    indexes=[]
    for i in range(len(A)-1):
        if A[i]==s[0] and A[i+1]==s[1]:
            indexes.append(i)
    length=len(indexes)
    if length != 0:
        NewS=[]
        NewS.append(A[:indexes[0]])
        for i in range(length-1):
            NewS.append(A[indexes[i]+2:indexes[i+1]])
        NewS.append(A[indexes[-1]+2:])
        times+=length
        nstr=""
        for i in NewS:
            nstr+=i      
        print(s+str(times)+" : "+nstr)
        return Remove(s,nstr,times)
    else:
        return [int(t),A]
def solve (X,Y,S):
    
    # Remove 'pr' first
    s1=s2=S
    x1=x2=y1=y2=0
    while s1.count("pr")!=0:
        R=Remove("pr",s1)
        x1=x1+int(R[0])
        P=Remove("rp",R[1])
        y1+=int(P[0])
        s1=P[1]
        print("@")
    while s2.count("rp")!=0:
        R=Remove("rp",S)
        y2=y2+int(R[0])
        P=Remove("pr",R[1])
        x2+=int(P[0])
        s2=P[1]
    sum1=(x1*X)+(y1*Y)
    sum2=(x2*X)+(y2*Y)
    print(S)
    print("pr : "+str(sum1)+" and rp : "+str(sum2))
    if sum1>=sum2:
        return sum1
    else:
        return sum2


print(solve(1,1,"rpankdfjaosdjfsjrhpasrjsriasdhriopsdrasdrprprprjsahnriurhskjfsijfsiparshpasraaapraaaapprraaaarrppaaaaprrp"))
