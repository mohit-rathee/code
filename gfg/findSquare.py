from typing import List
class Solution:
    def maxSquare(self, n : int, m : int, mat : List[List[int]]) -> int:
        dp=[[0 for j in range(m+1)] for i in range(n+1)] 
        max_side = 0 
        for i in range(n-1,-1,-1):
            for j in range(m-1,-1,-1):
                if mat[i][j]==1:
                    dp[i][j]=1+min(dp[i+1][j],dp[i][j+1],dp[i+1][j+1]) # using recurrence derived earlier
                    max_side=max(dp[i][j],max_side) # keep track of max length found so far
        return max_side
#{ 
 # Driver Code Starts
class IntMatrix:

    def __init__(self) -> None:
        pass

    def Input(self, n, m):
        matrix = []
        #matrix input
        for _ in range(n):
            matrix.append([int(i) for i in input().strip().split()])
        return matrix

    def Print(self, arr):
        for i in arr:
            for j in i:
                print(j, end=" ")
            print()


if __name__ == "__main__":
    t = int(1)
    for _ in range(t):

        n, m = [7,10]

        mat = [
            [1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,0,0,1,1,1,1],
            [0,1,0,1,1,1,1,1,1,1],
            [1,0,1,1,1,1,1,0,0,1],
            [0,0,1,1,1,0,1,0,1,0],
            [1,1,1,1,1,1,1,0,0,1],
        ]
        obj = Solution()
        for i in mat:
            print(i)
        res = obj.maxSquare(n, m, mat)

        print(res)

# } Driver Code Ends
