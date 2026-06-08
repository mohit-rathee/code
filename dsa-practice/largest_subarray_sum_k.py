def largest_subarray_with_sum_k(nums, k):
    subarray = [-1, -1]
    count = 0
    sum = 0
    prefix_sum = {}
    for i in range(len(nums)):
        num = nums[i]
        sum += num
        # i would always be bigger!
        # prefix_sum[sum] = min(prefix_sum[sum], i)
        if sum == k:
            # len of subarray is 1
            if 1 > count:
                count = 1
                subarray[0] = subarray[1] = i
        else:
            req_no = sum - k
            if req_no in prefix_sum:
                count = max(count, i - prefix_sum[req_no])
                subarray[0] = prefix_sum[req_no]
                subarray[1] = i
        if sum not in prefix_sum:
            prefix_sum[sum] = i

    print(nums)
    print(prefix_sum)
    print(count)
    print(subarray)


nums = [9, -3, 3, -1, 6, -5]
k = 0
largest_subarray_with_sum_k(nums, k)
