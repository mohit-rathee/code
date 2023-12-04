#     p={}
#     count=0
#     M=max(arr)
#     for i in arr:
#         if i in p.keys():
#             p[i]+=1
#         else:
#             p[i]=1

#     for i in p.keys():
#         if p[i]>1:
#             count+=p[i]
#             p[i]=1
    # for i in arr:
    #     for j in range(2*i,M+1,i):
    #         if j in p.keys():
    #             p[j]=0
    # print(p)
    # print(count)
    # for i in p.values():
    #     if i:
    #         count+=1
    # print(count)

# prime upto 10 ==> 2,3,5,7

def countSpecialNumbers(arr):
    N=len(arr)
    Arr=sorted(arr)
    special=[False for i in range(N)]
    count=0
    for i in range(N):
        if not special[i]:
            for j in range(i+1,N):
                if not special[j]:
                    if Arr[i]==Arr[j]:
                        special[i]=True
                        special[j]=True
                        count+=2
                        number=j+1
                        while number<N and Arr[number]==Arr[j]:
                            special[number]=True
                            number+=1
                            count+=1
                        continue
                    if Arr[j]%Arr[i]==0:
                        special[j]=True
                        count+=1
    return count
print(countSpecialNumbers([5,5,6,7,99,10,11,11,19,14,7]))