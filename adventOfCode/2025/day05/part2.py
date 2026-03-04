def parseInput(file):
    data = [line.rstrip() for line in file.readlines()]
    ranges = []
    ids = []
    blankLineCrossed = False
    for line in data:
        if (line == ''):
            blankLineCrossed = True
            continue
        if (blankLineCrossed == False):
            ranges.append([int(item) for item in line.split('-')])
        else:
            ids.append(int(line))
    return [ranges, ids]


def main(input):
    ranges, ids = parseInput(input)
    # print('ranges', len(ranges))
    # print('ids', len(ids))

    newRanges = []
    for rng in ranges:
        [x, y] = rng
        for newRngIdx in range(len(newRanges)):
            nRng = newRanges[newRngIdx]
            [X, Y] = nRng
            if (x >= X and x <= Y):
                if (y <= Y):
                    # X...[x...y]...Y
                    # range already present
                    x = y = None
                    break
                else:
                    # X...[x...Y...y]
                    # update x to Y+1
                    x = Y+1
            if (x < X and y >= X):
                if (y <= Y):
                    # [x...X...y]...Y
                    # update y to X-1
                    y = X-1
                else:
                    # [x...X...Y]...y
                    # update X to x
                    # update Y to y
                    newRanges[newRngIdx] = [x, y]
                    x = y = None
                    break
        if (x != None and y != None):
            newRanges.append([x, y])
    # print('newRanges', len(newRanges))

    totalFreshItems = 0
    for rng in newRanges:
        # print(rng[0], '-', rng[1])
        totalFreshItems += rng[1]-rng[0]+1
    print(totalFreshItems)
