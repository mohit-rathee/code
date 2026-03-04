from utils.inputReader import parseGrid


def printGrid(grid):
    for i in grid:
        for j in i:
            print(j, end=' ')
        print()


directions = [(0, 1), (1, 0), (-1, 0), (0, -1)]
checked = set()


def main(input):
    grid = parseGrid(input)
    # printGrid(grid)
    mx = len(grid)
    my = len(grid[0])
    price = 0
    for x in range(mx):
        for y in range(my):
            if (x, y) in checked:
                continue
            # print('visiting', grid[x][y], 'at', (x, y))
            area, perimeter = visit(x, y, grid[x][y], grid)
            checked.add((x, y))
            # print('for', grid[x][y],':', area, perimeter,  '=', area*perimeter)
            price += area*perimeter
    print(price)


def visit(x, y, plant, grid):
    mx = len(grid)
    my = len(grid[0])
    if x not in range(mx) or y not in range(my):
        return [0, 1]  # [area=0, perimeter=1]
    # print('visiting in ', (x, y))
    if grid[x][y] != plant:
        return [0, 1]  # [area=0, perimeter=1]
    # Area is found
    if (x, y) in checked:
        return [0, 0]
    area = 1
    perimeter = 0
    checked.add((x, y))
    for dir in directions:
        nx = x+dir[0]
        ny = y+dir[1]
        a, p = visit(nx, ny, plant, grid)
        area += a
        perimeter += p
    return [area, perimeter]
