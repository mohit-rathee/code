def modifyQueue(q, k):
        k_elements = q[:k]
        q = q[k:]
        #poped first k elements.
        res = k_elements[::-1]
        res.extend(q)
        return res


# Only following standard operations are allowed on queue.
# enqueue(x) : Add an item x to rear of queue
# dequeue() : Remove an item from front of queue
# size() : Returns number of elements in queue.
# front() : Finds front item.

