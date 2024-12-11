from utils.inputReader import parseLevels


dp = {}


def solve(num):
    if num in dp:
        return dp[num]
    elif len(str(num)) % 2 == 0:
        str_stone = str(num)
        half = len(str(num))//2
        left_stone = int(str_stone[:half])
        right_stone = int(str_stone[half:])
        ret = [left_stone, right_stone]
    else:
        new_num = num*2024
        ret = [new_num]
    dp[num] = ret
    return ret


def main():
    data = parseLevels('problem11')
    stones = data[0]
    for count in range(75):
        next_arrangment = []
        for stone in stones:
            # print('for ',stone)
            stone = int(stone)
            if stone==0:
                next_arrangment.append(1)
                continue
            new_stones = solve(stone)
            # print('new_stones',new_stones)
            for s in new_stones:
                next_arrangment.append(s)
            stones = next_arrangment
            # print(stones)
        print(count,len(stones))
        # for i in stones:
        #     print(i, end=' ')
        # print()
    print(len(stones))
