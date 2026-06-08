def largest_subarray_with_sum_k(nums, k):
    subarray = [-1, -1]
    count = 0
    sum = 0
    prefix_sum = [0 for i in range(len(nums))]
    for i in range(len(nums)):
        num = nums[i]
        sum += num
        if sum == k:
            # len of subarray is 1
            count = max(count, 1)
            subarray[0] = i
            subarray[1] = i
        else:
            for j in range(i):
                if sum - prefix_sum[j] == k:
                    count = max(count, i-j)
                    subarray[0] = j
                    subarray[1] = i
                    break
        prefix_sum[i] = sum

    print(nums)
    print(prefix_sum)
    print(count)
    print(subarray)


nums = [9, -3, 3, -1, 6, -5]
k = 0
largest_subarray_with_sum_k(nums, k)
