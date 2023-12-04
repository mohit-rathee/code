def lexicographicallyLargest(self,a, n):
    oddeven=self.oddeve(a,n)
    result=a[:]
    for i in oddeven:
        result[i[0]:i[1]]=sorted(a[i[0]:i[1]],reverse=True)
    return result

def oddeve(self,a, n):
    system=[]
    i=0
    while i<n-1:
        oddeve=a[i]%2
        j=i+1
        while j<n and oddeve==a[j]%2:
            j+=1
        if i!=j-1:
            system.append([i,j])
        i=j
    return system





lexicographicallyLargest([1,2,4,2,5,6,8,7,9,11,10], 11)













