
def search(arr,n,k):
    start=0
    end=n
    print(arr)
    if arr[-1]<k:
        return arr[-1],end
    while True:
        mid=(start+end)//2
        cost=arr[mid]
        if cost<k :
            start=mid
            if end-start==1:
                print("mid: "+str(mid))
                return cost,start
        elif cost>k:
            end=mid
            if end-start==1:
                print("mid: "+str(mid))
                return arr[start],start
        else:
            start=mid
            return cost,start

arr=[1,2,2,3,7,12,14,16,55,67,85,101]
n=len(arr)
k=225
def find(arr,n,k):
    tasted=0
    n=n-1
    while k!=0:
        Search=search(arr,n,k)
        costliest=Search[0]
        print("costliest: "+str(costliest))
        n=Search[1]
        # print(n)
        print("money: "+str(k))
        buy=k//costliest
        print("buy: "+str(buy))
        tasted+=buy
        k-=buy*costliest
        print(k)
    return tasted
          
print(find(arr, n, k))
