from utils.inputReader import parseGrid

# X+1 ===> GOING DOWN
# X-1 ===> GOING TOP
# Y+1 ===> GOING RIGHT
# Y-1 ===> GOING LEFT

directionVectors = {
    'top': (-1, 0),
    'bottom': (1, 0),
    'left': (0, -1),
    'right': (0, 1),
}
pattern = "*"


def printGrid(grid):
    for x in grid:
        for y in x:
            print(y, end=' ')
        print()


def main():
    grid = parseGrid('problem6')
    # printGrid(grid)
    maxX = len(grid)
    maxY = len(grid[0])
    # find ^
    X = Y = 0
    dir = 'top'
    for x in range(len(grid)):
        for y in range(len(grid[x])):
            if grid[x][y] == '^':
                X = x
                Y = y
    # print('x:', X, 'y:', Y)
    # printGrid(grid)
    while X > -1 and X < maxX and Y > -1 and Y < maxY:
        # print()
        if (grid[X][Y] == "#"):
            # print(dir)
            # print(X, Y)
            # print('going back')
            X = X-directionVectors[dir][0]
            Y = Y-directionVectors[dir][1]
            if dir == 'top':
                dir = 'right'
            elif dir == 'right':
                dir = 'bottom'
            elif dir == 'bottom':
                dir = 'left'
            elif dir == 'left':
                dir = 'top'
        else:
            grid[X][Y] = pattern
        # print(dir)
        # print(X, Y)
        X = X+directionVectors[dir][0]
        Y = Y+directionVectors[dir][1]
        # printGrid(grid)
    print(calculate_path_length(grid, pattern))


def calculate_path_length(grid, pattern):
    counter = 0
    for i in grid:
        for j in i:
            if j == pattern:
                counter += 1
    return counter
