from utils.inputReader import parseLevels


def orderCheck(n):
    return True if (n) > 0 else False


def safetyCheck(level):
    level = [int(lvl) for lvl in level]
    # print(level)
    # checks if its safe or not
    order = orderCheck(level[1]-level[0])
    # print(order)
    for i in range(1, len(level)):
        gapToPrevious = level[i] - level[i-1]
        if abs(gapToPrevious) > 0 and abs(gapToPrevious) < 4:
            if (order == orderCheck(gapToPrevious)):
                # order maintained this time
                continue
            else:
                # print('order breaked')
                return False
        else:
            # print('too high or low', gapToPrevious)
            return False
    # print('order maintained')
    return True


def main():
    levels = parseLevels('problem2')
    safeReports = 0
    for lvl in levels:
        if safetyCheck(lvl):
            safeReports += 1
        else:
            continue
    print(safeReports)
