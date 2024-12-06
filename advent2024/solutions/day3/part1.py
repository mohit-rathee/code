from utils.textReader import textReader
import re


def main():
    mem = textReader('problem3')
    # print(mem)
    pattern = r"mul\((\d+),(\d+)\)" 
    commands = re.findall(pattern,mem)
    ans = 0
    # print(len(commands))
    for mul in commands:
        # print(mul)
        ans += int(mul[0])*int(mul[1])
    print(ans)
