def parseGrid(file):
    grid = []

    for line in file.split('\n'):
        row = list(line.strip())
        new_row = []
        for item in row:
            # If the tile is #, the new map contains ## instead.
            # If the tile is O, the new map contains [] instead.
            # If the tile is ., the new map contains .. instead.
            # If the tile is @, the new map contains @. instead.
            if item == '#':
                new_row.append('#')
                new_row.append('#')
            elif item == 'O':
                new_row.append('[')
                new_row.append(']')
            elif item == '.':
                new_row.append('.')
                new_row.append('.')
            elif item == '@':
                new_row.append('@')
                new_row.append('.')
            else:
                print('error')
        grid.append(new_row)
    return grid


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
    printGrid(grid)
    x, y = getPos('@', grid)
    for move in [moves[0]]:
        dir = moves_dir[move]
        # print(dir)
        dir_vector = directions[dir]
        if dir == 'left' or dir == 'right':
            result = check_space_for_left_and_right(x, y, dir_vector, grid)
            if result:
                sx, sy = result
                grid[x][y] = '.'

                x += dir_vector[0]
                y += dir_vector[1]
                grid[x][y] = '@'

                start_with = '[' if dir == 'right' else ']'
                print(start_with)
                ny = y
                while (dir == 'left' and ny > sy) or (dir == 'right' and ny < sy):
                    ny += dir_vector[1]
                    grid[x][ny] = start_with
                    if start_with == '[':
                        start_with = ']'
                    else:
                        start_with = '['
                    print(start_with)
                # print(sx, sy)

    printGrid(grid)
    # result = checksum(grid)
    # print(result)


def checksum(grid):
    mx = len(grid)
    my = len(grid[0])
    sum = 0
    for x in range(mx):
        for y in range(my):
            if grid[x][y] == 'O':
                sum += (x*100) + y
    return sum


def check_space_for_left_and_right(x, y, dir_v, grid):
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
