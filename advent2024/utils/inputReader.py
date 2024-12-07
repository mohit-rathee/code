def parse2SpaceSeparatedLists(inputFile):
    with open("inputs/" + inputFile, "r") as f:
        data = [line.strip().split('   ') for line in f.readlines()]
        firstList = [el[0] for el in data]
        secondList = [el[1] for el in data]
    return [firstList, secondList]

def parseLevels(inputFile):
    with open("inputs/" + inputFile, "r") as f:
        data = [line.strip().split(' ') for line in f.readlines()]
    return data

def parseGrid(inputFile):
    with open("inputs/" + inputFile, "r") as f:
        data = [list(line.strip()) for line in f.readlines()]
    return data

def day5Input(inputFile):
    with open("inputs/" + inputFile, "r") as f:
        data = [line.strip() for line in f.readlines()]
        priorityQ = []
        printQ = []
        idx = 0
        while data[idx]:
            priorityQ.append(data[idx].split('|'))
            idx+=1
        idx+=1
        while idx<len(data):
            printQ.append(data[idx].split(','))
            idx+=1

        return [priorityQ,printQ]


