def subArraySum(arrs, n, s):
    arr=arrs.split()
    find=-1
    i=0
    ans=[]
    subsum=0
    while i<len(arr):
        if subsum<s:
            i+=1
            subsum+=int(arr[i])
            ans.append(arr[i])
        elif subsum>s:
            subsum-=int(ans[0])
            ans.pop(0)
        else:
            end=arr.index(ans[-1])+1
            start=arr.index(ans[0])+1
            return [start,end]
    return -1
print(subArraySum("135 101 170 125 79 159 163 65 106 146 82 28 162 92 196 143 28 37 192 5 103 154 93 183 22 117 119 96 48 127 172 139 70 113 68 100 36 95 104 12 123 134", 42,468))