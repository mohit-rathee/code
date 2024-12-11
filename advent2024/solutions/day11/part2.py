from utils.inputReader import parseLevels
import sys
sys.setrecursionlimit(100**3)


dp = {}
""" We will store pairs of (num,level) in dp """


def solve(num, lvl):
    if (num, lvl) in dp:
        # print('found for',(num,lvl),':',dp[(num,lvl)])
        return dp[(num, lvl)]
    if lvl == 75:
        return 1  # length
    if num == 0:
        ret = solve(1, lvl+1)
    elif len(str(num)) % 2 == 0:
        str_stone = str(num)
        half = len(str(num))//2
        left = int(str_stone[:half])
        right = int(str_stone[half:])
        ret = solve(left, lvl+1)+solve(right, lvl+1)
    else:
        ret = solve(num*2024, lvl+1)
    dp[(num, lvl)] = ret
    return ret


def main():
    data = parseLevels('problem11')
    stones = data[0]
    print(stones)
    ans = 0
    for stone in stones:
        stone = int(stone)
        length = solve(stone, 0)
        ans += length

    # for k,v in dp.items():
    #     print(k,":",v)
    print(ans)
