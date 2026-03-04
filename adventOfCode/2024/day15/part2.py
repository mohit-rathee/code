from utils.inputReader import printGrid


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
    grid = parseGrid(blocks)
    movesArr = []
    for move in list(moves):
        if move != '\n':
            movesArr.append(move)
    return grid, movesArr


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
        dir_vector = directions[dir]
        result = get_coordinates_to_move(x, y, dir_vector, grid)
        if result:
            for item in result[::-1]:
                x,y = item
                nx = x+dir_vector[0]
                ny = y+dir_vector[1]
                grid[nx][ny] = grid[x][y]
                grid[x][y] = '.'
            x+=dir_vector[0]
            y+=dir_vector[1]

    printGrid(grid,end='')
    result = checksum(grid)
    print(result)




def checksum(grid):
    mx = len(grid)
    my = len(grid[0])
    sum = 0
    for x in range(mx):
        for y in range(my):
            if grid[x][y] == '[':
                sum += (x*100) + y
    return sum


def get_coordinates_to_move(px, py, dir_v, grid):
    coordinates = [(px,py)]
    i = 0
    while i <len(coordinates):
        x,y = coordinates[i]
        nx = x+dir_v[0]
        ny = y+dir_v[1]
        # print(nx,ny)
        if grid[nx][ny] == '#':
            return False
        elif grid[nx][ny] in '[]':
            # print('found[]')
            if (nx,ny) not in coordinates:
                coordinates.append((nx,ny))
            if grid[nx][ny] == '[':
                ny+=1
            elif grid[nx][ny] == ']':
                ny-=1
            if (nx,ny) not in coordinates:
                coordinates.append((nx,ny))
        i+=1
    return coordinates
