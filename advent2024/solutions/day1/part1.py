from utils.inputReader import parseSpaceSeparatedLists

def main():
    lists = parseSpaceSeparatedLists('problem1')

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
