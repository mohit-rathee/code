from utils.inputReader import parseGrid

# X+1 ===> GOING DOWN
# X-1 ===> GOING TOP
# Y+1 ===> GOING RIGHT
# Y-1 ===> GOING LEFT

directionVectors = {
    'top': (-1, 0),
    'bottom': (1, 0),
    'left': (0, -1),
    'right': (0, 1),
}


def printGrid(grid):
    for x in grid:
        for y in x:
            print(y, end='\t')
        print()


def main():
    pattern = 1
    grid = parseGrid('problem6')
    # printGrid(grid)
    maxX = len(grid)
    maxY = len(grid[0])
    # find ^
    X = Y = 0
    dir = 'top'
    for x in range(len(grid)):
        for y in range(len(grid[x])):
            if grid[x][y] == '^':
                X = x
                Y = y
    # map a square from the last 3 collision points and place obstruction at the
    # 4th corner + directionVector, if there is no obstruction btw 3rd and 4th one.
    collisions = []
    square_loops = []
    printGrid(grid)
    while X > -1 and X < maxX and Y > -1 and Y < maxY:
        if (grid[X][Y] == "#"):
            X = X-directionVectors[dir][0]
            Y = Y-directionVectors[dir][1]
            if (len(collisions) >= 3):
                last_collision = collisions[-1]
                fourth_corner = map_square(collisions[-3:])
                current_pos = [X, Y]
                if not checkCollinearInbound(
                    last_collision, fourth_corner, current_pos
                ):
                    square_loops.append(fourth_corner)
                collisions.append([X, Y])
            else:
                collisions.append([X, Y])
            # if grid[X][Y] == "*":
            #     grid[X][Y] = '@'
            # else:
            #     grid[X][Y] = "*"
            if dir == 'top':
                dir = 'right'
            elif dir == 'right':
                dir = 'bottom'
            elif dir == 'bottom':
                dir = 'left'
            elif dir == 'left':
                dir = 'top'
        # else:
        #     grid[X][Y] = '*'
        # print(dir)
        # print(X, Y)
        X = X+directionVectors[dir][0]
        Y = Y+directionVectors[dir][1]
        # print()
        # print()
        # print()
        # print()
    # printGrid(grid)
    print(square_loops)
    print(len(square_loops))
    # print(calculate_path_length(grid, pattern))


def map_square(last3colissions):
    [a, b, c] = last3colissions
    x_gap = b[0] - a[0]
    y_gap = b[1] - a[1]
    fourth_corner = [c[0] - x_gap, c[1] - y_gap]
    # print('4th corner', fourth_corner)
    return fourth_corner


def checkCollinearInbound(p1, p2, pos):
    # print(p1,p2,pos)
    [x1, y1] = p1
    [x2, y2] = p2
    [x, y] = pos
    if x1 == x2:  # Vertical line
        return x == x1 and min(y1, y2) <= y <= max(y1, y2)

    elif y1 == y2:  # Horizontal line
        return y == y1 and min(x1, x2) <= x <= max(x1, x2)


def calculate_path_length(grid, pattern):
    counter = 0
    for i in grid:
        for j in i:
            if j == pattern:
                counter += 1
    return counter
