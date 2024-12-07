from utils.inputReader import day5Input


def process_data(priorityQ):
    ds = {}
    for [less, great] in priorityQ:
        # print(less, great)
        if less in ds:
            ds[less]['great'].append(great)
        else:
            ds[less] = {'great': [great], 'less': []}
        if great in ds:
            ds[great]['less'].append(less)
        else:
            ds[great] = {'less': [less], 'great': []}
    return ds


def main():
    [priorityQ, printQ] = day5Input('problem5')
    # print(priorityQ)
    # print(printQ)
    ds = process_data(priorityQ)
    # for i in ds:
    #     print(i, ds[i])
    # print()
    # for i in printQ:
    #     print(i)
    ans = check_printQ(printQ, ds)
    print(ans)


def check_printQ(printQ, ds):
    ans = 0
    for queue in printQ:
        result = check_queue(queue, ds)
        if result != False:
            ans += result
    return ans


def check_queue(queue, ds):
    # print(queue)
    for idx in range(len(queue)):
        el = queue[idx]
        # print(el, end=',')
        left = queue[:idx]
        right = queue[idx+1:]
        # print(left, el, right)
        for left_el in left:
            if left_el in ds[el]['great']:
                # print('fail')
                return False
        for right_el in right:
            if right_el in ds[el]['less']:
                # print('fail')
                return False
    # print('success')
    # print(queue[idx//2])
    return (int(queue[idx//2]))
