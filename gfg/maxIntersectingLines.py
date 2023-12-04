def maxIntersections(lines, N):
    points={}
    for i in lines:
        # print(i)
        # print(points)
        points[i[0]]=points.get(i[0],0)+1
        points[i[1]+1]=points.get(i[1]+1,0)-1
        # print(points)
    intersections=0
    Max=1
    for i in sorted(points):
        intersections+=points[i]
        Max=max(Max,intersections)
    print(points)
    print(Max)
    return Max
    
maxIntersections([[1,4],[3,5],[3,7],[3,2],[4,5],[4,7],[6,9],[1,2],[2,3],[2,9],[2,5],[-13,30]], 12)