def parseInput(file):
    data = [[i for i in line.rstrip('\n')] for line in file.readlines()]
    operations = data.pop()
    # for i in data:
        # print(i)
    # print(operations)
    lastOprIdx = 0
    values = []
    for idx in range(len(operations)):
        opr = operations[idx]
        if ((opr != ' ' or idx == len(operations)-1) and idx != lastOprIdx):
            # print('operation found', opr, 'at index', idx)
            # get values from range lastOprIdx to idx
            valStart = lastOprIdx
            # -1 will account for problem separating column
            valEnd = idx if idx == len(operations)-1 else idx-2
            oprValues = []
            for i in range(valStart, valEnd+1):  # valStart and valEnd are inclusive
                temp = ''
                for problemLines in data:
                    temp += problemLines[i]
                oprValues.append(int(temp))
            values.append(oprValues)
            lastOprIdx = idx
    operations = [opr for opr in operations if opr != ' ']
    return values, operations


def main(input):
    values, operations = parseInput(input)
    # print(values)
    # print(operations)
    grandTotal = 0
    for oprIdx in range(len(operations)):
        opr = operations[oprIdx]
        solution = None
        oprValues = values[oprIdx]
        for val in oprValues:
            # print(opr,val,end='')
            if (solution is None):
                solution = int(val)
                continue
            match opr:
                case '*':
                    solution *= int(val)
                case '+':
                    solution += int(val)
        # print('solution',solution)
        grandTotal += solution
    print(grandTotal)
