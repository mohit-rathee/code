def removeReverse(S):
    L=len(S)
    D=True
    start=True
    while D:
        newstr=remRev(S,L,start) 
        S=newstr[0]
        D=newstr[1]
        start=not start
        L-=1
    if start:
        return S[::-1]
    return S

def remRev(S,L,start):
    if start:
        for i in range(L):
            for j in range(L-1,i,-1):
                if S[i]==S[j]:
                    return S[:i]+S[i+1:], True
        return S,False
    else:
        for i in range(L-1,-1,-1):
            for j in range(i):
                if S[i]==S[j]:
                    return S[:i]+S[i+1:], True
        return S,False
print(removeReverse("abbaabbaabbbaaabaabaaabbbbaaabaaa"))
S="asbbac"
# i=2
S=S[:2:-1]+S[1::-1]
print(S)
    
    
    
    
    
    