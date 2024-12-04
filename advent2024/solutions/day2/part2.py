from utils.inputReader import parseLevels


def frequencyCheck(gaps):
    freqCounter = 0
    freqIndex = -1
    for i in range(len(gaps)):
        gap = gaps[i]
        if abs(gap) < 1 or abs(gap) > 3:
            freqCounter += 1
            freqIndex = i
    return [freqCounter, freqIndex]


def orderCheck(gaps):
    negative = 0
    positive = 0
    orderIndex = -1

    for i in range(len(gaps)):
        gap = gaps[i]
        if gap < 0:
            negative += 1
        else:
            positive += 1
        # save index for first tolerated value only
        if min(positive, negative) == 1 and orderIndex == -1:
            orderIndex = i

    orderCounter = min(negative, positive)
    return [orderCounter, orderIndex]


def safetyCheck(level):
    level = [int(lvl) for lvl in level]
    gaps = [0 for i in range(len(level)-1)]
    for i in range(1, len(level)):
        gaps[i-1] = level[i] - level[i-1]
    print('-----------------------')
    print(level)
    print(gaps)
    [freqCounter, freqIndex] = frequencyCheck(gaps)
    if freqCounter > 1:
        return False
    else:
        [orderCounter, orderIndex] = orderCheck(gaps)
        print('frequencyCheck', freqCounter, freqIndex)
        print('orderCheck', orderCounter, orderIndex)
        if orderCounter > 0:
            if orderCounter > 1:
                # orderCounter > 1 && freqCounter == 0/1
                return False
            if freqCounter == 1 and orderCounter == 1:
                if freqIndex == orderIndex:
                    # single Element cause order as well as freq error
                    return True
                else:
                    return False
            if freqCounter == 0 and orderCounter == 1:
                return True
            print('problem')
            return False
        else:
            # orderCounter == 0 && freqCounter == 0/1
            return True


def main():
    # levels = parseLevels('problem2')
    safeReports = 0
    for lvl in [[158, 159, 62, 60, 63, 63]]:
    # for lvl in levels:
        if safetyCheck(lvl):
            safeReports += 1
        else:
            continue
    print(safeReports)
