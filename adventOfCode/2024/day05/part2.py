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


def get_incorrectQ(printQ, ds):
    incorrect = []
    for queue in printQ:
        result = check_queue(queue, ds)
        if result == False:
            incorrect.append(queue)
    return incorrect


def check_queue(queue, ds):
    for idx in range(len(queue)):
        el = queue[idx]
        left = queue[:idx]
        right = queue[idx+1:]
        for left_el in left:
            if left_el in ds[el]['great']:
                return False
        for right_el in right:
            if right_el in ds[el]['less']:
                return False
    return (int(queue[idx//2]))


def main(input):
    [priorityQ, printQ] = day5Input(input)
    ds = process_data(priorityQ)
    incorrect = get_incorrectQ(printQ, ds)
    # for i in ds:
    #     print(i, ds[i])
    # print(incorrect)
    for i in incorrect:
        correct(i, ds)
    ans = 0
    for i in incorrect:
        ans += int(i[len(i)//2])
    print(ans)


def correct(queue, ds):
    # for i in ds:
    #     print(i, '\tgreat', ds[i]['great'], '\n\tless', ds[i]['less'])
    idx = 0
    while idx != len(queue):
        # print(queue)
        # print(idx)
        if sort(queue, idx, ds):
            idx += 1


def sort(queue, start, ds):
    el = queue[start]
    # check if elements in less of el are not in right
    for i in range(start+1, len(queue)):
        if queue[i] in ds[el]['less']:
            # print('swap')
            temp = queue[start]
            queue[start] = queue[i]
            queue[i] = temp
            return False
    # check if el is not in great of elements right to el
    for i in range(start, len(queue)):
        if el in ds[queue[i]]['great']:
            # print('swap')
            temp = queue[start]
            queue[start] = queue[i]
            queue[i] = temp
            return False
    return True
