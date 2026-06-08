def remove_duplicates(nums):
    i = 0
    for j in range(1, len(nums)):
        if (nums[i] != nums[j]):
            i += 1
            nums[i] = nums[j]


nums = [1, 1, 4, 4, 2, 2, 5]
remove_duplicates(nums)
print(nums)
