'''
 Intuition
  min of H1 or H2 will point to res
                    H1
                    |
              _  M (30)<-15 <-5
 50 <- 40 <- |_| I  of
        |     |  N (20)<-10 <-0
      (res)=>(res)  |
                    H2

  res = 0->5->10->15->20->30->40->50
'''

'''
class Node:
    def __init__(self,data):
        self.data=data
        self.next=None
'''
def mergeResult(h1,h2):
    res = None
    H1 = h1
    H2 = h2

    def point2res(node):
        nonlocal res
        nextNode = node.next
        node.next = res
        res = node
        return nextNode
    while H1 and H2: # when both lists are non empty
        if H1.data < H2.data:
            H1 = point2res(H1)
        else:
            H2 = point2res(H2)
    if H1: #then point to res in reverse order
        while H1:
            H1 = point2res(H1)
    if H2: #then point to res in reverse order
        while H2:
            H2 = point2res(H2)
    return res


