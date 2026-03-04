def parseInput(file):
    data = []
    for line in file.readlines():
        p, v = line.strip().split(' ')
        p = [int(i) for i in p.split('=')[1].strip().split(',')]
        v = [int(i) for i in v.split('=')[1].strip().split(',')]
        # print(p,v)
        data.append([p, v])
    return data


def printGrid(grid):
    for i in grid:
        for j in i:
            print(j, end='')
        print()


dirs = [(0, 1), (1, 0), (-1, 0), (0, -1)]


def main(inpu):
    width = 101
    height = 103
    # width = 11
    # height = 7
    step = 1

    data = parseInput(inpu)
    for i in range(1, 10**4):
        # if i % 1000 == 0:
        #     print(i)
        grid = [['.']*width for i in range(height)]
        for j in range(len(data)):
            p, v = data[j]
            px, py = p
            vx, vy = v
            px += (vx*step)
            py += (vy*step)
            px = px % width
            py = py % height
            data[j][0][0] = px
            data[j][0][1] = py
            if px in range(width) and py in range(height):
                grid[py][px] = '#'

        SEEN = set()
        maxLength = -1
        for x in range(height):
            for y in range(width):
                if (x, y) not in SEEN and grid[x][y] == "#":
                    # print(SEEN)
                    SEEN.add((x, y))
                    # print('new components added', (x, y))
                    length = 0
                    for dir in dirs:
                        nx = x + dir[0]
                        ny = y + dir[1]
                        length += traverse(nx, ny, grid, SEEN)
                    maxLength = max(maxLength,length)
        if maxLength >= 200:
            printGrid(grid)
            print('Length of Tree:',maxLength)
            print('Ans',i)
            break


def traverse(x, y, grid, SEEN):
    # print('checking ',(x,y))
    mx = len(grid)
    my = len(grid[0])
    if x not in range(mx) or y not in range(my):
        # print('out of bound')
        return 0

    if (x, y) in SEEN:
        # print('alreadey there')
        return 0
    # printGrid(grid)
    # print(grid[y][x])
    if grid[x][y] == "#":
        SEEN.add((x, y))
        # print('added',(x,y))
        length = 1
        for dir in dirs:
            nx = x + dir[0]
            ny = y + dir[1]
            length+=traverse(nx, ny, grid, SEEN)
        return length
    else:
        return 0
