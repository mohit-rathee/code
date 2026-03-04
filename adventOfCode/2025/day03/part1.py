from utils.inputReader import parseInstructions

def maxJoltage(bank):
    # find the 2 largest elements from the right
    joltages = list(bank)
    l = len(joltages)
    largest=joltages[l-2]
    secondLargest=joltages[l-1]
    if(l>2):
        for i in range(len(joltages)-3,-1,-1):
            if joltages[i] >= largest:
                if(largest>secondLargest):
                    secondLargest=largest
                largest=joltages[i]
    return largest+secondLargest

    # 54332109876

def main(input):
    banks = parseInstructions(input)
    # print(banks)
    totalJoltage=0
    # print(maxJoltage('0987654321'))
    # return
    for bank in banks:
        # print(bank)
        maxJol = maxJoltage(bank)
        # print('-->',maxJol)
        totalJoltage+=int(maxJol)
    print(totalJoltage)
