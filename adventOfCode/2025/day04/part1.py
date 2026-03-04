from utils.inputReader import parseGrid, printGrid


def check4Roll(x, y, g, d):
    if (d):
        print('checking for', x, y)
    if (g[x][y] == '@'):
        if (d):
            print('yes')
        return 1
    return 0


# direction Vectors in a grid
dirVectors = [
    [-1, -1],
    [-1, 1],
    [-1, 0],
    [1, 0],
    [1, 1],
    [1, -1],
    [0, -1],
    [0, 1],
]

# bug is in how I get the adjacent rolls


def getAdjacentRolls(x, y, grid):
    X = len(grid)
    Y = len(grid[0])
    totalRolls = 0
    d = True if (x == 1 and y == 1) else False
    d = False
    if (d):
        print('we are at ', x, y)
    for dir in dirVectors:
        dx = dir[0]+x
        dy = dir[1]+y
        if (dx >= 0 and dy >= 0 and dx < X and dy < Y):
            totalRolls += check4Roll(dx, dy, grid, d)
    if (d):
        print(totalRolls)
    return totalRolls


def main(input):
    grid = parseGrid(input)
    printGrid(grid)

    count = 0
    for x in range(len(grid)):
        for y in range(len(grid[0])):
            if (grid[x][y] == '@'):
                adjRolls = getAdjacentRolls(x, y, grid)
                if (adjRolls < 4):
                    count += 1
                    # print(x, y)
    print(count)
