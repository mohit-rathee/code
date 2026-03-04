from utils.inputReader import parseGrid, printGrid


def main(input):
    grid = parseGrid(input)
    # printGrid(grid)
    splitCount = 0
    for row in range(1, len(grid)):
        for col in range(len(grid[row])):
            value = grid[row][col]
            # if (row == 2 and col == 6):
            # print(value, grid[nextRow][col])
            prevRow = row-1
            aboveVal = grid[prevRow][col]
            # prioritising S and '|'
            if (aboveVal == 'S' or aboveVal == '|') and value == '.':
                grid[row][col] = '|'

            if (value == '^' and aboveVal == '|'):
                splitCount += 1
                prevCol = col-1
                nextCol = col+1
                # checking if leftCol and rightCol already have '|' the beam
                if prevCol >= 0:
                    grid[row][prevCol] = '|'
                if nextCol < len(grid[row]):
                    grid[row][nextCol] = '|'
    printGrid(grid)
    print(splitCount)
