from utils.inputReader import parseLevels
from .part1 import safetyCheck


def safetyCheck2(level):
    if (safetyCheck(level)):
        return True
    else:
        for i in range(len(level)):
            newLevel = level[:i]+level[i+1:]
            if safetyCheck(newLevel):
                return True
        return False


def main():
    levels = parseLevels('problem2')
    safeReports = 0
    # for lvl in [[158, 159, 62, 60, 63, 63]]:
    for lvl in levels:
        if safetyCheck2(lvl):
            safeReports += 1
        else:
            continue
    print(safeReports)
