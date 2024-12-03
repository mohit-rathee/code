from utils.inputReader import parseSpaceSeparatedLists


def main():
    lists = parseSpaceSeparatedLists('problem1')

    leftList = lists[0]
    rightList = lists[1]

    # one time traversal O(n)
    storage = {}
    for el in rightList:
        if el not in storage:
            storage[el] = 1
        else:
            storage[el]+=1

    sum = 0

    # one time traversal O(n)
    for el in leftList:
        if el in storage:
            sum += int(el)*storage[el]
        else:
            continue
    print(sum)
