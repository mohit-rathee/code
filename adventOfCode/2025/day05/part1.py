
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
    spoiledItems = 0
    for id in ids:
        isFresh = False
        for rng in ranges:
            if (id >= rng[0] and id <= rng[1]):
                # print('id:',id,'in',rng[0],'-',rng[1])
                isFresh = True
                break  # item is fresh
        if (isFresh):
            spoiledItems += 1
    print(spoiledItems)
