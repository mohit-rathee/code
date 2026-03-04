import math


def parseInput(file):
    data = [[int(pos) for pos in junction.rsplit()[0].split(',')]
            for junction in file.readlines()]
    return data


def straitLineDistance(a, b):
    x1, y1, z1 = a
    x2, y2, z2 = b
    return math.sqrt((x2-x1)**2 + (y2-y1)**2 + (z2-z1)**2)


def main(input):
    junctions = parseInput(input)
    juncXjunc = []
    for a in range(len(junctions)):
        for b in range(a+1, len(junctions)):
            dist = straitLineDistance(junctions[a], junctions[b])
            juncXjunc.append((a, b, dist))  # storing a,b for mapping purposes
    sortedJuncXJunc = sorted(juncXjunc, key=lambda junc: int(junc[2]))

    circuits = []  # sets of junctions which are in a circuit

    for i in range(1000):
        closestJunc = sortedJuncXJunc[i]
        a, b, d = closestJunc
        idxA = idxB = None
        for i, crkt in enumerate(circuits):
            if a in crkt:
                idxA = i
            if b in crkt:
                idxB = i
            if idxA is not None and idxB is not None:
                break
        if idxA is None and idxB is None:
            # make new circuit
            circuits.append({a, b})

        elif idxA is not None and idxB is None:
            # join b in a
            circuits[idxA].add(b)
        elif idxA is None and idxB is not None:
            # join a in b
            circuits[idxB].add(a)
        elif idxA != idxB:
            circuits[idxA] |= circuits[idxB]
            circuits.pop(idxB)

    # for i in sortedJuncXJunc[:10]:
    #     print(i)
    # print(len(circuits))
    # print(circuits)
    l = sorted([len(crkt) for crkt in circuits],reverse=True)
    print(l[0]*l[1]*l[2])
