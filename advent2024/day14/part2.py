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
            if type(j) is int:
                print('*', end=' ')
            else:
                print(' ', end=' ')
        print()


def main(inpu):
    width = 101
    height = 103
    step = 1

    data = parseInput(inpu)
    for i in range(1,10**4):
        # s = input(':')
        print(i)
        grid = [['.']*width for i in range(height)]
        for i in range(len(data)):
            p,v = data[i]
            px, py = p
            vx, vy = v
            # print('adding', (vx, vy))
            px += (vx*step)
            py += (vy*step)
            # print('newPos', (px, py))
            px = px % width
            py = py % height
            data[i][0][0]= px
            data[i][0][1]= py
            # print('newPos', (px, py))
            if px in range(width) and py in range(height):
                if grid[py][px] == '.':
                    grid[py][px] = 1
                else:
                    grid[py][px] += 1
            # print('pos', p)
            # print('vel', v)
        printGrid(grid)
        print()
