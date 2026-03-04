from utils.inputReader import parseInstructions

def checkInvalidId2(id):
    id = str(id)
    newId = id+id
    newId=newId[1:len(newId)-1]
    if(id in newId):
        return True
    else:
        return False

def checkInvalidId(id):
    id=str(id)
    N = len(id)
    # print(id,N)
    primes=[2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97] # extend this list for checking bigger ID's.
    for p in primes:
        # print('selecting prime ',p)
        segLen = N/p
        # print('segement length',segLen)

        if(segLen<1):
            # print('seg len is small than 1')
            return False
        if(N%p!=0):
            # print('skiping this prime as not a factor of id')
            continue
        segLen = int(segLen)
        firstSeg = id[0:segLen]
        # print('first segement',firstSeg)
        isMatched = True
        for i in range(1,p):
            nextSegStart = (segLen*i)
            # print('next segement Start',nextSegStart)
            nextSeg = id[nextSegStart:nextSegStart+segLen]
            # print('next segement ',nextSeg)
            if (firstSeg!= nextSeg):
                isMatched = False
                break
        if(isMatched):
            return True


def main(input):
    instructionsLine = parseInstructions(input)
    instructions = [i.split(",") for i in instructionsLine][0]
    # print(instructions)
    # First check if loopCount is in efficient range.
    # loopCount=0
    sum=0
    for rng in instructions:
        # print('*')
        [start,end] = rng.split('-')
        # print(start,end)
        for iter in range(int(start),int(end)+1):
            # print(iter)
            # loopCount+=1
            if(checkInvalidId2(iter)):
                sum+=iter
    print(sum)
    # print(loopCount)
    # print(checkInvalidId2('123412341'))
