from utils.textReader import textReader
import re


def main():
    mem = textReader('problem3')
    # mem = ",what(936,615)*:who()[[[~:mul(3,5)~;&{don't()-do()*mul(431,254))  select(){}#*+"
    # print(mem)
    mul_pattern = r"mul\((\d+),(\d+)\)"
    do_pattern = r"do\(\)"
    dont_pattern = r"don't\(\)"

    dontRegex = re.compile(dont_pattern)
    doRegex = re.compile(do_pattern)
    mulRegex = re.compile(mul_pattern)

    ans = 0
    start = 0

    is_do = True
    while start != len(mem):
        if is_do:
            # calculate for previous
            print('is_do is', is_do)
            print('start',start)
            match = dontRegex.search(mem, start, len(mem))
            if (match != None):
                end = match.start()
            else:
                end = len(mem)
            print('dont is not until', end)
            print('searching for mul in', start, end)
            commands = mulRegex.findall(mem, start, end)
            for mul in commands:
                print(mul)
                ans += int(mul[0])*int(mul[1])
            print('ans now is',ans)
            is_do = False
            if match==None:
                print('no dont found')
                print('Ans',ans)
                return ans
            start = match.end()
        else:
            print('is_do is', is_do)
            match = doRegex.search(mem, start, len(mem))
            if (match == None):
                print('no do found')
                print('Ans',ans)
                return ans
            start = match.end()
            print('found do at', start)
            is_do = True
