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
            area, perimeter = count(x, y, grid)
            sides = calculate_side(perimeter)
            # print('for', grid[x][y], ':', area, sides,  '=', area*sides)
            # print()
            price += area*sides
    print(price)


def calculate_side(perimeter):
    up = []
    down = []
    left = []
    right = []
    for p in perimeter:
        if p[2] == (-1, 0):  # up
            up.append((p[0], p[1]))
        elif p[2] == (1, 0):  # down
            down.append((p[0], p[1]))
        elif p[2] == (0, 1):  # right
            right.append((p[0], p[1]))
        elif p[2] == (0, -1):  # left
            left.append((p[0], p[1]))
    # print('up', up)
    # print('left', left)
    # print('down', down)
    # print('right', right)

    # 0 for x and 1 for y
    # In up and down, x is common
    # In left and right, y is common

    up_perm = calculate_distinct_sides(0, up)  
    down_perm = calculate_distinct_sides(0, down)
    left_perm = calculate_distinct_sides(1, left)
    right_perm = calculate_distinct_sides(1, right)
    # print('up_perm', up_perm)
    # print('down_perm', down_perm)
    # print('left_perm', left_perm)
    # print('right_perm', right_perm)
    return up_perm+down_perm+left_perm+right_perm
    # return left_perm+right_perm


def calculate_distinct_sides(common, perm):
    not_common = 0 if common else 1
    distinct = {}
    for p in perm:
        if p[common] in distinct:
            distinct[p[common]].append(p[not_common])
        else:
            distinct[p[common]] = [p[not_common]]
    # print(len(distinct),distinct)
    sides = 0
    for d in distinct:
        arr = sorted(distinct[d])
        # print(arr)
        sides+=1
        value = arr[0]
        idx = 1
        while idx < len(arr):
            if arr[idx] != value+1:
                # print(arr[idx],value+1)
                # print('adding side')
                sides += 1
                value = arr[idx]
            else:
                value+=1
            idx += 1


        # print(arr)
    # print('sides',sides)
    return sides


def count(x, y, grid):
    plant = grid[x][y]
    area = 1
    perimeter = set()
    checked.add((x, y))
    for dir in directions:
        nx = x+dir[0]
        ny = y+dir[1]
        a, p = visit(nx, ny, dir, plant, grid)
        area += a
        for i in p:
            perimeter.add(i)
    return [area, perimeter]


def visit(x, y, dir, plant, grid):
    mx = len(grid)
    my = len(grid[0])
    if x not in range(mx) or y not in range(my):
        # print((x, y, dir))
        return [0, [(x, y, dir)]]  # [area=0, perimeter=1]
    # print('visiting in ', (x, y))
    if grid[x][y] != plant:
        # print((x, y, dir))
        return [0, [(x, y, dir)]]  # [area=0, perimeter=1]
    # Area is found
    if (x, y) in checked:
        return [0, []]
    area = 1
    perimeter = set()
    for dir in directions:
        nx = x+dir[0]
        ny = y+dir[1]
        checked.add((x, y))
        a, p = visit(nx, ny, dir, plant, grid)
        area += a
        for i in p:
            perimeter.add(i)
    return [area, perimeter]
