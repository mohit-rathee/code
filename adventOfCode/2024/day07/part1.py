from utils.inputReader import day7Input
import itertools

possible_operations = ['+', '*']


def main(input):
    data = day7Input(input)
    result = 0
    for [sample, num_list] in data:
        sample = int(sample)
        num_list = [int(nums) for nums in num_list]
        # print(sample,num_list)
        N = len(num_list) - 1
        all_operation_lists = list(
            itertools.product(possible_operations, repeat=N))
        for opr_list in all_operation_lists:
            # print(sample)
            # print(opr_list)
            if sample != calculate(num_list, opr_list):
                continue
            # print('good')
            # print('good',sample, num_list,opr_list)
            result += sample
            break
    print(result)


def calculate(num_list, opr_list):
    # print(num_list, opr_list)
    result = int(num_list[0])
    # print(result, end=' ')
    for idx in range(1, len(num_list)):
        if opr_list[idx-1] == "+":
            # print('+', num_list[idx], end=' ')
            result += num_list[idx]
        else:
            # print('*', num_list[idx], end=' ')
            result *= num_list[idx]
    # print('=', result)
    return result
