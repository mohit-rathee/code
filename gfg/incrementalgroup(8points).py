#     # dynamic programming
#     # 1. dictionary with string of list/pattern
# ans=[]
# length=0
# # 3. swap / pour 1 to left
# def pour(arr,x,y,K):
#     newarr=arr[:]
#     # print("at "+str(x))
#     newarr[x]+=1
#     newarr[y]-=1
#     if str(newarr) in ans:
#         # print("found")
#         # print(str(newarr))
#         # print(ans)
#         return  
#     ans.append(str(newarr))
#     global length
#     length+=1
#     # print(newarr)
#     return newarr

# # 4. check wheater it exist or not
# def check(s):
#     # global ans
#     if s in ans:
#         return 0
#     else:
#         return 1

#     # 2. split the tree
# def splitTree(arr,l):
#     split=[]
#     start=[]
#     end=[]
#     for i in range(l-1):
#         if arr[i+1]-arr[i]>=2:
#             split.append([i,i+1])
#         if arr[i]<arr[i+1]:
#             start.append(i)
#             end.append(i+1)
#     for i in start:
#         for j in end:
#             if i+1==j or i==j or i>j :
#                 continue
#             split.append([i,j])


#     # print(arr)
#     # print("start")
#     # print(start)
#     # print("end")
#     # print(end)
#     # print(split)



#     if split:
#         return split
#     return 0

# def solve(arr,K):   
#     if arr ==None:
#         return
#     split=splitTree(arr, K)
#     # print(arr)
#     if split ==0:
#         # print("reached end")
#         return 
#     if len(split)==1:
#         # print("split at :")
#         # print(split)
#         arr=pour(arr,split[0][0],split[0][1],K)
#         solve(arr,K)
#     elif len(split)>1:
#         for i in range(len(split)):
#             newarr=pour(arr, split[i][0],split[i][1],K)
#             # print(newarr)
#             # print("Getting In with "+str(newarr))
#             if newarr:
#                 solve(newarr, K)
#             # print("Got Back with "+str(arr))
#     return 0


        
# def countWaystoDivide(N, K):
#     arr=[]
#     for i in range (K-1):
#         arr.append(1)
#     arr.append(N-K+1)
#     ans.append(str(arr))
#     global length
#     length+=1
#     # print(arr)
#     solve(arr,K)
#     print(length)
#     print(len(ans))



# countWaystoDivide(60,43)


 # Function to count the number
    # of ways to divide the number N
    # in groups such that each group
    # has K number of elements
    def calculate(self, pos, prev, left, K, dp):
        
        # Base Case
        if (pos == K):
            if (left == 0):
                return 1
            else:
                return 0
    
        # If N is divides completely
        # into less than K groups
        if (left == 0):
            return 0
        if(dp[pos][left][prev]!=-1):
            return dp[pos][left][prev]
        answer = 0
    
        # Put all possible values
        # greater equal to prev
        for i in range(prev, left + 1):
            answer += self.calculate(pos + 1, i, left - i, K,dp)
           
        dp[pos][left][prev]= answer
        return answer
        
    def countWaystoDivide(self, N, K):
        dp = [[[-1 for j in range(N+1)] for j in range(N+1)] for j in range(K+1)]
        return self.calculate(0, 1, N, K, dp)
     
    