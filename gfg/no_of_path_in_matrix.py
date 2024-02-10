def numberOfPath (n, k, arr):
    counter=[0]
    dp = [[0]*n]*n
    print(dp)
    def recurse(sum,x,y):
        sum+=arr[x][y]
        if x+y+2==2*n:
            if sum==k:
                counter[0]+=1
            return
        if sum>k:
            return
        if x<n-1:
            recurse(sum,x+1,y)
        if y<n-1:
            recurse(sum,x,y+1)

    recurse(0,0,0)
    print(counter[0])

Arr = [
    [1,2,3],
    [2,3,4],
    [3,4,5],
]
print(Arr)
numberOfPath(3,15,Arr)
