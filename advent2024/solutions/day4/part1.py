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
    'top': (0, -1),
    'bottom': (0, 1),
    'left': (-1, 0),
    'right': (1, 0),
    'left-top': (-1, -1),
    'right-top': (1, -1),
    'left-bottom': (-1, 1),
    'right-bottom': (1, 1)
}


def main():
    pattern = list('XMAS')
    print()
    grid = parseGrid('problem4')
    # grid = [
    #     ['X', 'M', 'A', 'S'],
    #     ['M', 'M', '.', '.'],
    #     ['A', '.', 'A', '.'],
    #     ['S', '.', '.', 'S'],
    #     ['X', 'M', 'A', 'S'],
    #     ['M', 'M', '.', '.'],
    #     ['A', '.', 'A', '.'],
    #     ['S', '.', '.', 'S'],
    #     ['S', 'A', 'M', 'X'],
    # ]
    # maxX = len(grid[0])
    # maxY = len(grid)
    # printGrid(grid)
    # print('width', maxX)
    # print('height', maxY)
    # print('pattern', pattern)

    no_of_patterns = 0
    for y in range(len(grid)):
        for x in range(len(grid[0])):
            if grid[y][x] == pattern[0]:
                no_of_patterns += depthSearch(grid, x, y, pattern)
    print('no_of_patterns', no_of_patterns)


def depthSearch(grid, x, y, pattern):
    # print('found', pattern[0], 'at (', x, ',', y, ')')
    counter = 0
    for dir in directionVectors:
        dirUnit = directionVectors[dir]
        # print('direction', dir)
        if check(grid, x, y, dirUnit, pattern):
            counter += 1
    # print(counter)
    return counter


def check(grid, x, y, dir, pattern, idx=1):
    newX = x+dir[0]
    newY = y+dir[1]
    maxX = len(grid[0])
    maxY = len(grid)
    # print(x, y)
    # print(newX, newY)
    # print('------')
    if newX > -1 and newX < maxX and newY > -1 and newY < maxY:
        if grid[newY][newX] == pattern[idx]:
            if (len(pattern)-1 == idx):
                # print('string found')
                return True
            return check(grid, newX, newY, dir, pattern, idx+1)
        else:
            # print('string not found')
            return False
    else:
        # print('out of bound')
        return False
