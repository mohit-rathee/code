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
            print(j, end=' ')
        print()


def main(input):
    width = 101
    height = 103
    step = 100
    # ogrid = [['.']*width for i in range(height)]
    grid = [['.']*width for i in range(height)]

    data = parseInput(input)
    # for p, v in data:
    #     px, py = p
    #     vx, vy = v
    #     if px in range(width) and py in range(height):
    #         print('oldPos', (px, py))
    #         if ogrid[py][px] == '.':
    #             ogrid[py][px] = 1
    #         else:
    #             ogrid[py][px] += 1
    #
    # printGrid(ogrid)
    for p, v in data:
        px, py = p
        vx, vy = v
        # print('adding', (vx, vy))
        px += (vx*step)
        py += (vy*step)
        # print('newPos', (px, py))
        px = px % width
        py = py % height
        # print('newPos', (px, py))
        if px in range(width) and py in range(height):
            if grid[py][px] == '.':
                grid[py][px] = 1
            else:
                grid[py][px] += 1
        # print('pos', p)
        # print('vel', v)
    # printGrid(grid)
    # print()
    a = 0
    b = 0
    c = 0
    d = 0
    
    for x in range(height):
        for y in range(width):
            # print(grid[x][y],end = ' ')
            xH = height//2
            yH = width//2
            if x == xH:
                continue
            if y == width//2:
                continue
            if grid[x][y]=='.':
                continue
            if x> xH and y> yH:
                a +=grid[x][y]
            elif x> xH and y< yH:
                b+=grid[x][y]
            elif x< xH and y< yH:
                c+=grid[x][y]
            elif x< xH and y> yH:
                d+=grid[x][y]

        # print()
    # print(a,b,c,d)

    print(a*b*c*d)
