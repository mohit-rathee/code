def makeBeautiful(string):
    arr=string.split()
    for i in range(len(arr)):
        arr[i]=int(arr[i])
    l=[arr[0]]
    for i in range(1,len(arr)):
        if(len(l)==0):
            l.append(arr[i])
        elif(arr[i]>=0 and l[-1]>=0):
            l.append(arr[i])
        elif(arr[i]<0 and l[-1]<0):
            l.append(arr[i])
        else:
            l.pop()
    return l


print(makeBeautiful("0 2 3 -4 -5 -6 7 8 0 -1 2"))