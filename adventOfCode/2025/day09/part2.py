
X = 1
Y = 0


def main(input):
    blocks = [[int(p) for p in position.rsplit()[0].split(',')]
              for position in input.readlines()]
    # print(blocks)
    M = 0
    for blkId in range(len(blocks)):
        for otherId in range(blkId, len(blocks)):
            a = blocks[blkId]
            b = blocks[otherId]
            case = None
            if (a[X] <= b[X] and a[Y] <= b[Y]):
                # a is topleft and b is bottomRight
                case = 1
            elif (a[X] > b[X] and a[Y] > b[Y]):
                # b is topleft and a is bottomRight
                case = 2
            elif (a[X] <= b[X] and a[Y] >= b[Y]):
                # a is topRight and b is bottomLeft
                case = 3
            elif (a[X] > b[X] and a[Y] < b[Y]):
                # b is topRight and a is bottomLeft
                case = 4

            match(case):
                case 0:
                    # a is topleft and b is bottomRight
                case 1:
                case 2:
                case 3:

            topLeft = a if a[X]
            area = (abs(b[0]-a[0])+1) * (abs(b[1]-a[1])+1)
            if area > M:
                # print(a, b, area)
                M = area
    print(M)
