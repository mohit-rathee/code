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
    start_x = start_y = X = Y = 0
    dir = 't'
    for x in range(len(grid)):
        for y in range(len(grid[x])):
            if grid[x][y] == '^':
                X = x
                Y = y
                start_x = x
                start_y = y
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
            if grid[X][Y] == ".":
                grid[X][Y] = pattern
        # print(dir)
        # print(X, Y)
        X = X+directionVectors[dir][0]
        Y = Y+directionVectors[dir][1]
    return [grid, (start_x, start_y)]


def printGrid(grid):
    for x in grid:
        for y in x:
            print(y, end=' ')
        print()


def main(input):
    grid = parseGrid(input)
    [grid, start] = traverse(grid)
    # printGrid(grid)
    ans = check_all_obstruction_points(grid, start)
    print(ans)


def check_all_obstruction_points(grid, start):
    counter = set()
    maxX = len(grid)
    maxY = len(grid[0])
    for x in range(maxX):
        for y in range(maxY):
            if grid[x][y] == pattern:
                # print(grid[x][y])
                if check_loop(grid, (x, y), start):
                    counter.add((x,y))
    return len(counter)


def check_loop(grid, pos, start):
    maxX, maxY = len(grid), len(grid[0])
    visited = set()  # Track visited positions and directions
    dir = 't'  # Start moving upwards
    x, y = start
    grid[pos[0]][pos[1]] = "#"
    while True:
        if (x, y, dir) in visited:
            grid[pos[0]][pos[1]] = "."
            return True
        visited.add((x, y, dir))

        x += directionVectors[dir][0]
        y += directionVectors[dir][1]

        if x < 0 or x >= maxX or y < 0 or y >= maxY:
            grid[pos[0]][pos[1]] = "."
            return False

        if grid[x][y] == "#":
            x -= directionVectors[dir][0]
            y -= directionVectors[dir][1]
            dir = rotate(dir)
