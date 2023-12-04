sumK(root,k):
total=[0]
    def recurse(node,Psums):
        for i in range(len(Psums)):
            curSum=Psums[i]+node.data
            Psums[i]=curSum
            if curSum==k:
                 total[0]+=1
        Psums.append(node.data)
        if node.data==k:
            total[0]+=1
        if node.left:
            recurse(node.left,Psums)
        if node.right:
            recurse(node.right,Psums)
    recurse(root,[])
    return total[0]
