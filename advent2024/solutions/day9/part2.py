from utils.inputReader import parseMem


def main():
    mem = parseMem('problem9')
    # print(mem)
    newMem, file, free = extract_info(mem)
    # print(newMem)
    # print(file)
    # print(free)
    compacted_mem = compacte_filesystem(newMem, file, free)
    # print(compacted_mem)
    check_sum = calculate_checksum(compacted_mem)
    print(check_sum)


def extract_info(mem):
    file = []
    free = []

    newMem = []
    idx = 0
    isFile = True
    for i in range(len(mem)):
        start = len(newMem)
        length = int(mem[i])
        if isFile:  # odd -> File
            # print('start', start, 'len', length)
            file.append([start, length])
            newMem += [idx]*int(mem[i])
            idx += 1
            isFile = False
        else:
            # print('start', start, 'len', length)
            free.append([start, length])
            newMem += [None]*int(mem[i])
            isFile = True
    return newMem, file, free


def calculate_checksum(mem):
    result = 0
    for i in range(len(mem)):
        if (mem[i] == None):
            continue
        # print(i*mem[i])
        result += i*int(mem[i])
    return result


def compacte_filesystem(mem, file_blocks, free_blocks):
    for file_idx in range(len(file_blocks)-1, -1, -1):
        file = file_blocks[file_idx]
        file_start = file[0]
        file_len = file[1]
        for free_idx in range(len(free_blocks)):
            free = free_blocks[free_idx]
            free_start = free[0]
            free_len = free[1]
            if free_len >= file_len and file_start>free_start:
                # print(file_idx, 'file block starts at',
                #       file_start, 'with len', file_len)
                # print('free block starts at', free_start, 'with len', free_len)
                # print('match found')
                for i in range(file_len):
                    mem[free_start] = file_idx
                    free_start+=1
                for i in range(file_start,file_start+file_len):
                    mem[i] = None
                    # free_start+=1
                # free_start += file_len
                free_len -= file_len
                free[0] = free_start
                free[1] = free_len

                break
        # print('no match found')

    return mem
