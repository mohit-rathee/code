# Function to move zeroes to the end
def moveZeroes(nums):
    # i represents the  index of the first zero in array
    i = -1
    # j represents the index of curr_item
    j = 0

    # Find the first zero
    for x in range(len(nums)):
        if nums[x] == 0:
            # update zero index
            i = x
            # we traversed upto x, now curr_item is x+1
            j = x+1
            break

    # If no zero found, return
    if i == -1:
        return

    # Start from the next index of first zero
    while (j < len(nums)):
        # If current element is non-zero
        if nums[j] != 0:
            # Swap with nums[j]
            nums[j], nums[i] = nums[i], nums[j]
            # Move i to next zero
            i += 1
        # increment curr_item
        j += 1


nums = [0, 1, 0, 0, 0, 3, 12]
moveZeroes(nums)

print(nums)
