def createNumber(list):
    num = 0
    while(list):
        a = list.data
        num *= 10
        num+=a
        list = list.next
    return num

def subLinkedList(l1, l2): 
    num1 = createNumber(l1)
    num2 = createNumber(l2)
    return num1-num2

