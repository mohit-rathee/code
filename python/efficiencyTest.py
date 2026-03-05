import time
memSpace = 1000
mem = [[0 if ((i+j) % 2 == 0) else 1 for i in range(memSpace)]
       for j in range(memSpace)]


def getAdjacentValues(x, y, mem):
    X = memSpace
    Y = memSpace
    values = [[x-1, y-1], [x-1, y], [x-1, y+1],
              [x, y-1], [x, y], [x, y+1],
              [x+1, y-1], [x+1, y], [x+1, y+1],
              ]
    finalVal = []
    for val in values:
        if val[0] < X and val[1] < Y:
            finalVal.append(val)
    return finalVal


def updateWithoutCheck(positions, mem):
    for pos in positions:
        x, y = pos
        mem[x][y] = '*'


def updateWithCheck(positions, mem):
    for pos in positions:
        x, y = pos
        if (mem[x][y] == 0):
            mem[x][y] = '*'
        else:
            mem[x][y] = '$'


def directUse():
    for x in range(memSpace):
        for y in range(memSpace):
            adjVal = getAdjacentValues(x, y, mem)
            updateWithoutCheck(adjVal, mem)


def ifUse():
    for x in range(memSpace):
        for y in range(memSpace):
            adjVal = getAdjacentValues(x, y, mem)
            updateWithCheck(adjVal, mem)


u = time.time()
ifUse()
v = time.time()
print('time too in ifUse is ', v-u)
u = time.time()
directUse()
v = time.time()
print('time too in directUse is ', v-u)
# print(mem)
