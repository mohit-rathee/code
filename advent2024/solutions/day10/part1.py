from utils.inputReader import parseGrid


def printGrid(grid):
    for i in grid:
        for j in i:
            print(j, end=' ')
        print()


#               right  down      up      left
directions = [(0, 1), (1, 0), (-1, 0), (0, -1)]


def main():
    totalScore = 0
    grid = parseGrid('problem10')
    # printGrid(grid)
    trail_heads = getTrailHeads(grid)
    for head in trail_heads:
        score = getScore(head, grid)
        totalScore += score
    print(totalScore)
    return totalScore


def getScore(head,grid):
    last_height = 0
    x = int(head[0])
    y = int(head[1])
    # print('starting at',head)
    score = traverse(x,y,grid,last_height)
    return score
    
    # while x in range(mx) and y in range(my) and grid[x][y]==last_height+1:
    #     print(grid[x][y])
    #     last_height+=1

def traverse(x,y,grid,height_req):
    score = 0
    mx = len(grid)
    my = len(grid[0])
    if x in range(mx) and y in range(my):
        if int(grid[x][y]) == height_req:
            # print(x,y)
            # print(height_req)
            # print('value valid')
            if grid[x][y] == "9":
                # print('found end at',(x,y))
                return 1
            for dir in directions:
                new_x = x+dir[0]
                new_y = y+dir[1]
                score += traverse(new_x,new_y,grid,height_req+1)
            # print(x,y,'score',score)
            return score
        else:
            # print('out of order')
            return 0
    else:
        return 0





def getTrailHeads(grid):
    trail_heads = []
    for x in range(len(grid)):
        for y in range(len(grid[x])):
            if grid[x][y] == "0":
                trail_heads.append((x, y))
    return trail_heads
