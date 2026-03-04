
def main(input):
    blocks = [[int(p) for p in position.rsplit()[0].split(',')]
              for position in input.readlines()]
    # print(blocks)
    M = 0
    for blkId in range(len(blocks)):
        for otherId in range(blkId, len(blocks)):
            a = blocks[blkId]
            b = blocks[otherId]
            area = (abs(b[0]-a[0])+1) * (abs(b[1]-a[1])+1)
            if area > M:
                # print(a, b, area)
                M = area
    print(M)
