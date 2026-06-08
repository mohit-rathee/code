def secondLargestElement(nums):
    largest = nums[0]
    sec_largest = -1
    for num in nums:
        # when bigger
        if num > largest:
            # downshift
            sec_largest = largest
            largest = num
        elif num < largest and num > sec_largest:
            # update second largest
            sec_largest = num
    return sec_largest


def secondSmallesElement(nums):
    smallest = nums[0]
    sec_smallest = -1
    for num in nums:
        # when bigger
        if num < smallest:
            # downshift
            sec_smallest = smallest
            smallest = num
        elif num > smallest and num < sec_smallest:
            # update second smallest
            sec_smallest = num
    return sec_smallest


print(secondLargestElement([8, 8, 7, 6, 5]))
print(secondSmallesElement([8, 8, 7, 6, 5]))
