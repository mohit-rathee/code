# from utils.inputReader import printGrid


def parseInput(file):
    data = []
    for line in file.readlines():
        p, v = line.strip().split(' ')
        p = [int(i) for i in p.split('=')[1].strip().split(',')]
        v = [int(i) for i in v.split('=')[1].strip().split(',')]
        data.append([p, v])
    return data


def main(input):
    width = 101
    height = 103
    step = 100
    yH = height//2
    xH = width//2
    a = b = c = d = 0

    data = parseInput(input)
    for p, v in data:
        px, py = p
        vx, vy = v
        px += (vx*step)
        py += (vy*step)
        px = px % width
        py = py % height
        if 0 <= px < width and 0 <= py < height:
            if px == xH:
                continue
            if py == yH:
                continue
            if px > xH and py > yH:
                a += 1
            elif px > xH and py < yH:
                b += 1
            elif px < xH and py < yH:
                c += 1
            elif px < xH and py > yH:
                d += 1

    # print(a, b, c, d)
    print(a*b*c*d)
