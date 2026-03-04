from utils.inputReader import parseInstructions

def maxJoltageBy12Digits(bank):
    # find the 2 largest elements from the right
    joltages = list(bank)
    ans = ''
    while(len(ans)<12):
        rightOffset = 12 - len(ans) -1
        m = joltages[0]
        id = 0
        for joltIdx in range(1, len(joltages)-rightOffset):
            if (joltages[joltIdx] > m):
                m = joltages[joltIdx]
                id = joltIdx
            if (joltages[joltIdx]==9):
                break # no element is bigger then 9
        ans+=m
        joltages= joltages[id+1:]

    return ans
    # 981111970


def main(input):
    banks = parseInstructions(input)
    # print(banks)
    totalJoltage = 0
    # print(maxJoltage('0987654321'))
    # return
    for bank in banks:
        # print(bank)
        maxJol = maxJoltageBy12Digits(bank)
        # print('-->', maxJol)
        totalJoltage += int(maxJol)
    print(totalJoltage)
