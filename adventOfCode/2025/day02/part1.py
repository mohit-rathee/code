from utils.inputReader import parseInstructions

def checkInvalidId(id):
    id = str(id)
    if(len(id)%2==0):
        halfLen = len(id)//2
        for i in range(halfLen):
            if(id[i]!=id[halfLen+i]):
                return False
        return True
    else:
        return False


def main(input):
    instructionsLine = parseInstructions(input)
    instructions = [i.split(",") for i in instructionsLine][0]
    # print(instructions)
    # First check if loopCount is in efficient range.
    # loopCount=0
    sum=0
    for rng in instructions:
        [start,end] = rng.split('-')
        # print(start,end)
        for iter in range(int(start),int(end)+1):
            # print(iter)
            # loopCount+=1
            if(checkInvalidId(iter)):
                sum+=iter
    print(sum)
    # print(loopCount)
