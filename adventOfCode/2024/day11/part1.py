from utils.inputReader import parseLevels


def main(input):
    data = parseLevels(input)
    stones = data[0]
    # print(stones)
    for count in range(25):
        # print(count)
        next_arrangment = []
        for stone in stones:
            stone = int(stone)
            if stone == 0:
                next_arrangment.append('1')
            elif len(str(stone)) % 2 == 0:
                # even
                str_stone = str(stone)
                half = len(str(stone))//2
                left_stone = str_stone[:half]
                right_stone = str_stone[half:]
                next_arrangment.append(left_stone)
                next_arrangment.append(right_stone)
            else:
                # even
                new_number = stone*2024
                next_arrangment.append(new_number)
        stones = next_arrangment
        # for i in stones:
        #     print(i, end=' ')
        # print()
    print(len(stones))
