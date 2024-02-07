def calcDistanc(arr1,arr2):
    index = 0
    while arr1[index] == arr2[index]:
        index+=1
    return len(arr1)+len(arr2)-index-index+2
    

def findDist(root,a,b):
    def traverseDFS(level,node):
        if not node:
            return
        if node.data==a or node.data==b:
            finalArr.append(traverseArr)
            if len(finalArr)==2:
                return
        traverseArr.append(node.data)
        traverseDFS(level+1,node.left)
        traverseDFS(level+1,node.right)
        traverseArr.pop()

    finalArr=[]
    traverseArr=[]
    traverseDFS(0,root)
    return calcDistanc(finalArr[0],finalArr[1])
