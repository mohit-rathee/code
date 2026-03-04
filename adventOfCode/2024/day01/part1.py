from utils.inputReader import parse2SpaceSeparatedLists

def main(input):
    lists = parse2SpaceSeparatedLists(input)

    leftList = lists[0]
    rightList = lists[1]

    # Timsort algorithm O(nlog(n))
    sortedLeftList = sorted(leftList)
    sortedRightList = sorted(rightList)

    sum = 0
    # One time traversal O(n)
    for i in range(len(sortedRightList)):
        gap = int(sortedLeftList[i]) - int(sortedRightList[i])
        # modules function
        if gap < 0:
            gap *= -1
        sum += gap

    print(sum)
