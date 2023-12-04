def minOperation(s): 
    l=len(s)
    i=0
    j=1
    d=False
    while j<l:
        if s[i]==s[j]:
            start=j
            while i<start:
                d=False
                if j>=l:
                    break
                if s[i]==s[j]:
                    d=True
                    i+=1
                    j+=1
                    continue
                break
            if d:
                print(s)
                print("start: "+str(start))
                return start+1+l-(2*start)
            else:
                i=0
        else:
            j+=1
    print(s)
    return l

print(minOperation("abcabcaabcabcas"))
# abc d abc a bcdabcas