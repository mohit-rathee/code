from utils.inputReader import parseGrid


def printGrid(grid):
    for row in grid:
        for col in row:
            print(col, end=' ')
        print()

# X+1 ===> GOING RIGHT
# X-1 ===> GOING LEFT
# Y+1 ===> GOING DOWN
# Y-1 ===> GOING TOP


directionVectors = {
    'left-top': (-1, -1),
    'right-top': (1, -1),
    'left-bottom': (-1, 1),
    'right-bottom': (1, 1)
}


def main(input):
    pattern = list('MAS')
    # print()
    grid = parseGrid(input)
    # grid = [
    #     ['S', '.', 'S'],
    #     ['.', 'A', '.'],
    #     ['M', '.', 'M'],
    #     ['.', 'A', '.'],
    #     ['S', '.', 'S'],
    # ]
    # printGrid(grid)
    # maxX = len(grid[0])
    # maxY = len(grid)
    # print('width', maxX)
    # print('height', maxY)
    # print('pattern', pattern)

    no_of_patterns = 0
    for y in range(len(grid)):
        for x in range(len(grid[0])):
            if grid[y][x] == 'A':
                no_of_patterns += depthSearch(grid, x, y, pattern)
    print(no_of_patterns)


def depthSearch(grid, x, y, pattern):
    info = {}
    for dir in directionVectors:
        dirUnit = directionVectors[dir]
        # print('direction', dir)
        info[dir] = get(grid, x, y, dirUnit)
    if info['left-top'] == "M" and info['right-bottom'] == "S":
        if info['right-top'] == "M" and info['left-bottom'] == "S":
            return 1
        if info['right-top'] == "S" and info['left-bottom'] == "M":
            return 1
        return 0
    if info['left-top'] == "S" and info['right-bottom'] == "M":
        if info['right-top'] == "S" and info['left-bottom'] == "M":
            return 1
        if info['right-top'] == "M" and info['left-bottom'] == "S":
            return 1
        return 0
    return 0


def get(grid, x, y, dir):
    newX = x+dir[0]
    newY = y+dir[1]
    maxX = len(grid[0])
    maxY = len(grid)
    if newX > -1 and newX < maxX and newY > -1 and newY < maxY:
        return grid[newY][newX]
    else:
        return False
