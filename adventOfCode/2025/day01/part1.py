from utils.inputReader import parseInstructions


def main(input):
    instructions = parseInstructions(input)

    count = 0       # no of times the dial has been to 0
    dial_pos = 50   # initial dial position
    steps = 100     # total positions on dial

    for inst in instructions:
        rotation = inst[0]
        number = int(inst[1:])
        if (rotation == 'R'):
            dial_pos += number
        elif (rotation == 'L'):
            dial_pos -= number
        else:
            print('error')
            break

        dial_pos %= steps
        if (dial_pos == 0):
            count += 1
    print(count)
