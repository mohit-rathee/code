def parse2SpaceSeparatedLists(file):
    data = [line.strip().split('   ') for line in file.readlines()]
    firstList = [el[0] for el in data]
    secondList = [el[1] for el in data]
    return [firstList, secondList]


def parseLevels(file):
    data = [line.strip().split(' ') for line in file.readlines()]
    return data


def parseGrid(file):
    data = [list(line.strip()) for line in file.readlines()]
    return data


def day5Input(file):
    data = [line.strip() for line in file.readlines()]
    priorityQ = []
    printQ = []
    idx = 0
    while data[idx]:
        priorityQ.append(data[idx].split('|'))
        idx += 1
    idx += 1
    while idx < len(data):
        printQ.append(data[idx].split(','))
        idx += 1

    return [priorityQ, printQ]


def day7Input(file):
    data = [line.strip().split(':') for line in file.readlines()]
    result = []
    for i in data:
        result.append([i[0], i[1].strip().split(' ')])
    return result


def parseMem(file):
        data = list(file.readline().strip())
        return data


def textReader(file):
    text = file.readlines()
    return text[0]
