from utils.inputReader import parseMem


def main(input):
    mem = parseMem(input)
    # print(mem)
    newMem = []
    idx = 0
    isFile = True
    for i in range(len(mem)):
        if isFile:  # odd -> File
            # for j in range(int(mem[i])):
            #     newMem.append(idx)
            newMem += [idx]*int(mem[i])
            idx += 1
            isFile = False
        else:
            # for j in range(int(mem[i])):
            #     newMem.append(None)
            newMem += [None]*int(mem[i])
            isFile = True
    # print(newMem)
    compacted_mem = compacte_filesystem(newMem)
    check_sum = calculate_checksum(compacted_mem)
    print(check_sum)


def calculate_checksum(mem):
    result = 0
    for i in range(len(mem)):
        if (mem[i] == None):
            break
        # print(i*mem[i])
        result += i*int(mem[i])
    return result


def compacte_filesystem(mem):
    start = 0
    end = len(mem)-1
    while start < end:
        while mem[start] != None:
            start += 1
        while mem[end] == None:
            end -= 1
        if(start>=end):
            break
        # print(start, end)
        mem[start] = mem[end]
        mem[end] = None
        start += 1
        end -= 1
    return mem
