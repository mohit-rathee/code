def insertionSort(head):
    # loop into items and then backtrace their appropriate values.
    currVal = nextVal = head
    prevVal=None
    while currVal.next !=None:
        nextVal = currVal.next
        #backtrace
        innerVal = head
        if innerVal.data < currVal.data:
            while innerVal.next.data < currVal.data:
                innerVal = innerVal.next
            # put here currVal
            if innerVal.next != currVal: # no need if it's good.
                temp = innerVal.next
                innerVal.next = currVal
                currVal.next = temp
        elif prevVal:
            prevVal.next = currVal.next
            currVal.next = head
            head = currVal
        prevVal=currVal
        currVal=nextVal
    return head

