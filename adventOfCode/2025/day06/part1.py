def parseInput(file):
    data = [[i for i in line.rstrip().split(' ') if i]
            for line in file.readlines()]
    operations = data.pop()
    return data, operations


def main(input):
    values, operations = parseInput(input)
    # print(values, operations)
    grandTotal = 0
    for oprIdx in range(len(operations)):
        opr = operations[oprIdx]
        solution = None
        for value in values:
            val = value[oprIdx]
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
