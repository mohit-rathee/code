from utils.inputReader import parseGrid, printGrid

def recursivePath(x, y, grid):
    if x >= len(grid):
        return 1
    if y < 0 or y >= len(grid[0]):
        return 0
    if grid[x][y] == '.':
        # go down
        return recursivePath(x+1, y, grid)
    elif grid[x][y] == '^':
        noOfPathFromHere = (recursivePath(x, y-1, grid) +
                            recursivePath(x, y+1, grid))
        grid[x][y] = noOfPathFromHere
        return noOfPathFromHere
    else:
        return grid[x][y]


def main(input):
    grid = parseGrid(input)
    # printGrid(grid)
    posOfS = grid[0].index('S')
    # print(posOfS)
    print(recursivePath(2, posOfS, grid))
