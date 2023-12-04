def perfectSum(arr, n, s):
    dp = [1] + [0]*s
    # print(dp)
    print(arr)
    count=0
    MOD = 10**9 + 7
    for a in arr:
        print("For "+str(a))
        # print("loop from "+str(a-1)+" to "+str(s))
        for i in range(s, a-1, -1):
            if dp[i-a]:
                dp[i] = (dp[i] + dp[i-a])%MOD
                count+=1
            # print(dp[i] + dp[i-a])
        # print('----------')
        print(dp)
    print(count)
    return dp[s]

perfectSum([1,2,2,3,4,5],6,10)        