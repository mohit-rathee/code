def parseGrid(file):
    data = [list(line.strip()) for line in file.split('\n')]
    return data


def parseInput(file):
    blocks, moves = file.read().split('\n\n')
    # print(blocks)
    grid = parseGrid(blocks)
    # print()
    # print(moves)
    movesArr = []
    for move in list(moves):
        if move != '\n':
            movesArr.append(move)
    # print(movesArr)
    return grid, movesArr


def printGrid(grid):
    for i in grid:
        for j in i:
            print(j, end=' ')
        print()


def getPos(string, grid):
    mx = len(grid)
    my = len(grid[0])
    for x in range(mx):
        for y in range(my):
            if grid[x][y] == string:
                return x, y


# x+1 ==> DOWN
# x-1 ==> UP
# y+1 ==> RIGHT
# y-1 ==> LEFT
directions = {
    'up': (-1, 0),
    'down': (1, 0),
    'right': (0, 1),
    'left': (0, -1),
}
moves_dir = {
    '^': 'up',
    'v': 'down',
    '>': 'right',
    '<': 'left',
}


def main(input):
    grid, moves = parseInput(input)
    # printGrid(grid)
    x, y = getPos('@', grid)
    for move in moves:
        dir = moves_dir[move]
        # print(dir)
        dir_vector = directions[dir]
        result = check_for_space(x, y, dir_vector, grid)
        if result:
            sx, sy = result
            grid[sx][sy] = 'O'
            grid[x][y] = '.'
            x += dir_vector[0]
            y += dir_vector[1]
            grid[x][y] = '@'
            # print(sx, sy)

    printGrid(grid)
    result = checksum(grid)
    print(result)

def checksum(grid):
    mx = len(grid)
    my = len(grid[0])
    sum = 0
    for x in range(mx):
        for y in range(my):
            if grid[x][y] == 'O':
                sum += (x*100) + y
    return sum


def check_for_space(x, y, dir_v, grid):
    mx = len(grid)
    my = len(grid[0])
    nx, ny = x, y
    while grid[nx][ny] != '.':
        nx += dir_v[0]
        ny += dir_v[1]
        # print('checking for', (nx, ny))
        if 0 <= nx < mx and 0 <= ny < my:
            if grid[nx][ny] == '#':
                # print('found wall')
                return False
        else:
            # print('exception out of bound')
            return False
    return (nx, ny)

