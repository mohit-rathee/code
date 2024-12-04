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
