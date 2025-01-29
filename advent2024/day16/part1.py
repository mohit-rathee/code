from utils.inputReader import parseGrid, printGrid
import sys

# Get the current recursion limit
# print("Default recursion limit:", sys.getrecursionlimit())

# Increase the recursion limit
sys.setrecursionlimit(10**5)


def find_start(grid):
    for x in range(len(grid)):
        for y in range(len(grid[x])):
            if grid[x][y] == 'S':
                return (x, y)


dirs = {
    'up': (-1, 0),
    'down': (1, 0),
    'left': (0, -1),
    'right': (0, 1),
}


def main(input):
    grid = parseGrid(input)
    newGrid = []
    # for r in grid:
    #     newGrid.append(r)
    x, y = find_start(grid)
    # newGrid[x][y] = 'S'
    # printGrid(grid)
    min_score = traverse(x, y, 'right', grid, newGrid)
    printGrid(newGrid, end='\t')
    print(min_score)


seen = []
dp = {}


def traverse(x, y, dir, grid, newGrid):
    ix, iy = (x, y)

    if (x, y) in seen:
        # print('touched already')
        return float('inf')
    if (x, y) in dp:
        # print('found in dp')
        if (x, y) == (ix, iy):
            print('found at',(x,y), dp[(x, y)])
        return dp[(x, y)]
    if grid[x][y] == "#":
        # print()
        # print('at', (x, y))
        # print('direction', dir)
        # printGrid(newGrid, end='\t')
        # print()
        # print('wall found')
        return float('inf')
    if grid[x][y] == "E":
        print('ending found')
        return 0
    # if grid[x][y] == "S":
    #     print('error')
    seen.append((x, y))
    # newGrid[x][y] = '*'
    dx, dy = dirs[dir]
    # print(x+dx, y+dy)
    frwd_score = 1+traverse(x+dx, y+dy, dir, grid, newGrid)
    final_score = frwd_score
    for new_dir in get_l_and_r(dir):
        dx, dy = dirs[new_dir]
        nx = x+dx
        ny = y+dy
        score = 1001+traverse(nx, ny, new_dir, grid, newGrid)
        # if (x, y) == (ix, iy):
        # print('---',new_dir, (dx, dy), score)
        final_score = min(final_score, score)
    seen.pop()
    # newGrid[x][y] = '.'
    # if (x, y) == (ix, iy):
    #     print('final_score', final_score)
    if final_score != float('inf'):
        dp[(x, y)] = final_score
    return final_score


def get_l_and_r(dir):
    left_dir = right_dir = ''
    if dir == 'up':
        left_dir = 'left'
        right_dir = 'right'
    elif dir == 'down':
        left_dir = 'right'
        right_dir = 'left'
    elif dir == 'left':
        left_dir = 'down'
        right_dir = 'up'
    elif dir == 'right':
        left_dir = 'up'
        right_dir = 'down'
    return [left_dir, right_dir]
