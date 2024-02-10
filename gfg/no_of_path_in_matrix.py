def numberOfPath (n, k, arr):
    dp=[[[-1 for _ in range(k+1)]for _ in range(n+1)]for _ in range(n+1)]
    def util(i,j,k):
        if i==n-1 and j==n-1 and k==arr[i][j]:
            return 1
        if i>=n or j>=n or k<0:
            return 0
        if dp[i][j][k]!=-1:
            return dp[i][j][k]
        down=util(i+1,j,k-arr[i][j])
        right=util(i,j+1,k-arr[i][j])
        dp[i][j][k]=down+right
        return dp[i][j][k]
    util(0,0,k)
    print(dp[0][0][k])
Arr = [
    [1,2,3],
    [2,3,4],
    [3,4,5],
]
numberOfPath(3,15,Arr)
