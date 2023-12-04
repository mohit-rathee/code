def minOperations(N):
    # arr=[]
    # for i in range(N):
    #     arr.append(2*i+1)
    # print(arr)
    # Sum = N*N
    # value of every element in last = Sum/N = N
    # to reach their no of steps is no of step to 
    # make half arr looks like the resultant arr

    if N%2==0:
        # sum of 1st half is (N/2)^2
        # they have to be N*N/2
        # the gap is no of count or operations applied
        # N*N/2-N*N/4 === is equivalent to === N*N/4
        steps=N//2*N//2
    else:
        # sum of 1st half is ((N-1)/2)^2
        # they have to be (N-1)*(N)/2
        # (N-1)*(N)/2 - ((N-1)/2)^2 ==equivalent to == (N*N)-1/4 == N*N/4 - 0.25
        print(N*N)
        steps=(N//2)*(N//2+1)
    print(int(steps))
    print(N//2)
minOperations(5)
