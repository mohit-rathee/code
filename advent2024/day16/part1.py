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
    for r in grid:
        newRow = ['.']*len(r)
        newGrid.append(newRow)
    x, y = find_start(grid)
    newGrid[x][y] = 'S'
    printGrid(grid)
    is_possible, min_score = traverse(x, y, 'right', grid, newGrid)
    if is_possible:
        printGrid(newGrid, end='\t')
        print(min_score)


seen = []


def traverse(x, y, dir, grid, newGrid):
    if (x, y) in seen:
        return [False, 0]
    if grid[x][y] == '#':
        # print('found wall')
        newGrid[x][y] = "#"
        return [False, 0]
    seen.append((x, y))
    if grid[x][y] == 'E':
        newGrid[x][y] = "E"
        # print('-------found End')
        return [True, 0]

    score = 1
    # print('pos', (x, y))
    # print('dir', dir)
    dx, dy = dirs[dir]
    is_frwd, frwd_score = traverse(x+dx, y+dy, dir, grid, newGrid)
    if is_frwd:
        score += frwd_score
    else:
        score = float('inf')
    left_dir, right_dir = get_l_and_r(dir)
    left_v = dirs[left_dir]
    lx = x+left_v[0]
    ly = y+left_v[1]
    left_score = right_score = float('inf')
    is_left, left_score = traverse(lx, ly, left_dir, grid, newGrid)
    if is_left:
        # print('left path from', (x, y))
        left_score = 1001+left_score
    else:
        left_score = float('inf')
    right_v = dirs[right_dir]
    rx = x+right_v[0]
    ry = y+right_v[1]
    is_right, right_score = traverse(rx, ry, right_dir, grid, newGrid)
    if is_right:
        # print('right path from', (x, y))
        right_score = 1001+right_score
    else:
        right_score = float('inf')
    # print('----')
    # print('score at', (x, y), ':', score)
    # print('left_score', left_score)
    # print('right_score', right_score)
    minimum = min(left_score, right_score, score)
    # print('final score at', (x, y), min)
    if minimum == float('inf'):
        newGrid[x][y] = 'x'
    else:
        newGrid[x][y] = minimum
    idx = seen.index((x, y))
    for i in range(idx,len(seen)):
        seen.pop()
    return [True, minimum]


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
    return left_dir, right_dir
