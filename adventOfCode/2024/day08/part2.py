from utils.inputReader import parseGrid
import itertools


def printGrid(grid):
    for i in grid:
        for j in i:
            print(j,end=' ')
        print()

def main(input):
    grid = parseGrid(input)
    # printGrid(grid)
    antena_locations = traverse_grid(grid)
    anitnodes = map_antinodes(antena_locations,grid)
    print(len(anitnodes))

def map_antinodes(antena_locations, grid):
    mx = len(grid)
    my = len(grid[0])
    antinode_points = set()
    for (antena,locations) in antena_locations.items():
        if(len(locations)<2):
            continue
        combo = itertools.combinations(locations,2)
        # print(list(combo))
        # print(antena)
        for c in combo:
            p1 = c[0]
            p2 = c[1]
            gap_x = p2[0] - p1[0]
            gap_y = p2[1] - p1[1]
            # print(p1,p2,'gap_x:',gap_x,'gap_y',gap_y)
            np1 = p1
            np2 = p2
            while np1[0] in range(mx) and np1[1] in range(my):
                antinode_points.add(np1)
                np1 = (np1[0]-gap_x,np1[1]-gap_y)

            while np2[0] in range(mx) and np2[1] in range(my):
                antinode_points.add(np2)
                np2 = (np2[0]+gap_x,np2[1]+gap_y)
    return antinode_points

def traverse_grid(grid):
    antena_locations = {}
    mx = len(grid)
    my = len(grid[0])
    for x in range(mx):
        for y in range(my):
            if grid[x][y] == '.':
                continue
            if grid[x][y] in antena_locations:
                antena_locations[grid[x][y]].append((x,y))
            else:
                antena_locations[grid[x][y]] = [(x,y)]
    return antena_locations

