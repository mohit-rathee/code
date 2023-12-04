def nextMove(n,m,pos):
    newpos=[]
    for i in pos:
        x=i[0]
        y=i[1]
        if x+1<n:
            if y+2<m:
                newpos.append([x+1,y+2])
            if y-2>-1:
                newpos.append([x+1,y-2])
        if x-1>-1:    
            if y+2<m:
                newpos.append([x-1,y+2])
            if y-2>-1:
                newpos.append([x-1,y-2])
        if x+2<n:
            if y+1<m:
                newpos.append([x+2,y+1])
            if y-1>-1:
                newpos.append([x+2,y-1])
        if x-2>-1:
            if y+1<m:
                newpos.append([x-2,y+1])
            if y-1>-1:
                newpos.append([x-2,y-1])
    if newpos:
        return newpos
    return 0

def knightInGeekland(arr, start):
    N=len(arr[0])
    M=len(arr)
    x=start[0]
    y=start[1]
    points=[]
    dp=[[0 for i in range(N)] for i in range(M)]
    points.append(arr[x][y])
    dp[x][y]=1
    validmove=[[x,y]]
    while True:
        moves=nextMove(M,N,validmove)
        if moves:
            # Taking points at valid move
            validmove=[]
            point=0
            for i in moves:
                if dp[i[0]][i[1]]==0:
                    validmove.append(i)
                    point+=arr[i[0]][i[1]]
                    dp[i[0]][i[1]]=1
            points.append(point)
        else:
            break
    # MAGIC
    print(points)
    L=len(points)
    B=[]
    changed=True
    while changed:
        B=points[:]
        for i in range(L):
            P=points[i]
            if i+P<L and i!=L-1:
                points[i]+=points[i+P]
        if B==points:
            changed=False

    print(points)
    maxP=max(points)
    steps=points.index(maxP)
    print(steps)



knightInGeekland([[10, 8], [5, 1], [0, 8], [6, 0], [4, 0], [0, 6], [3, 3], [7, 10], [7, 3], [8, 5], [2, 5], [1, 9], [8, 1], [4, 6], [5, 8], [6, 10], [0, 5], [9, 4], [1, 6], [4, 8], [2, 5], [4, 10], [7, 9], [5, 8], [1, 7], [3, 8], [9, 6], [8, 1], [3, 2], [5, 4], [3, 6]], [8, 1])