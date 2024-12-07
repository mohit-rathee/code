from utils.inputReader import parseGrid

# X+1 ===> GOING DOWN
# X-1 ===> GOING TOP
# Y+1 ===> GOING RIGHT
# Y-1 ===> GOING LEFT

directionVectors = {
    't': (-1, 0),
    'b': (1, 0),
    'l': (0, -1),
    'r': (0, 1),
}
pattern = "*"


def rotate(dir):
    if dir == 't':
        dir = 'r'
    elif dir == 'r':
        dir = 'b'
    elif dir == 'b':
        dir = 'l'
    elif dir == 'l':
        dir = 't'
    return dir


def traverse(grid):
    # printGrid(grid)
    maxX = len(grid)
    maxY = len(grid[0])
    # find ^
    X = Y = 0
    dir = 't'
    for x in range(len(grid)):
        for y in range(len(grid[x])):
            if grid[x][y] == '^':
                X = x
                Y = y
    # printGrid(grid)
    while X > -1 and X < maxX and Y > -1 and Y < maxY:
        # print()
        if (grid[X][Y] == "#"):
            # print(dir)
            # print(X, Y)
            # print('going back')
            X = X-directionVectors[dir][0]
            Y = Y-directionVectors[dir][1]
            dir = rotate(dir)
        else:
            if type(grid[X][Y]) == list:
                grid[X][Y].append(dir)
            else:
                grid[X][Y] = [dir]
        # print(dir)
        # print(X, Y)
        X = X+directionVectors[dir][0]
        Y = Y+directionVectors[dir][1]
    return grid


def printGrid(grid):
    for x in grid:
        for y in x:
            if type(y) == list:
                for i in y:
                    print(i, end='')
                print('\t', end='')
            else:
                print(y, end='\t')
        print()


def main():
    grid = parseGrid('problem6')
    grid = traverse(grid)
    loops = check_all_obstruction_points(grid)
    print(loops)
    printGrid(grid)


def check_all_obstruction_points(grid):
    points = set()
    maxX = len(grid)
    maxY = len(grid[0])
    # printGrid(grid)
    for x in range(2, maxX):
        for y in range(maxY):
            if type(grid[x][y]) == list:
                # print(grid[x][y])
                pos = check_this_obstruction_point(grid, (x, y))
                if (pos):
                    points.add(pos)
    # pos = check_this_obstruction_point(grid, (6, 4))
    return points


def check_this_obstruction_point(grid, pos):
    maxX = len(grid)
    maxY = len(grid[0])
    # print(pos, end=' ')
    (x, y) = pos
    dir = grid[x][y]
    for d in dir:
        new_d = rotate(d)
        if new_d in dir:
            return False
        # print(new_d)
        while x in range(maxX) and y in range(maxY) and grid[x][y] != "#":
            if type(grid[x][y]) == list:
                if new_d in grid[x][y]:
                    (x, y) = pos
                    x += directionVectors[d][0]
                    y += directionVectors[d][1]
                    if (grid[x][y] != "#"):
                        # print('found for ', pos, d, (x, y))
                        return (x, y)
                    # print("# already obstructed")
                    return False
            x += directionVectors[new_d][0]
            y += directionVectors[new_d][1]
        # print('not found')
        return False

