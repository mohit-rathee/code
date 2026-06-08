def reverse(arr, start=0, end=None):
    length = len(arr)
    if not end:
        end = length - 1
    length = end - start + 1
    if (start == end):
        return
    for i in range(start, start+length//2):
        opp_idx = end - i + start
        temp = arr[opp_idx]
        arr[opp_idx] = arr[i]
        arr[i] = temp


# right rotate array by k elements
def reverse_rotate(arr, k):
    # keep k from 0 to len(arr)
    k %= len(arr)

    # return if no shifting is required
    if (k == 0):
        return

    last_idx = len(arr)-1
    # reverse full array
    reverse(arr)
    # reverse last k elements
    reverse(arr, last_idx-k+1, last_idx)
    # reverse first n-k elements
    reverse(arr, 0, last_idx-k)


arr = [1, 2, 3, 4, 5, 6]
k = 13
print(arr, 'shift by', k)
reverse_rotate(arr, k)
print('after shifting', k, arr)
