from utils.inputReader import parseInstructions


def main(input):
    instructions = parseInstructions(input)

    count = 0       # no of times the dial has been to 0
    dial_pos = 50   # initial dial position
    steps = 100     # total positions on dial

    for inst in instructions:
        rotation = inst[0]
        number = int(inst[1:])
        if_zero = dial_pos == 0
        if (rotation == 'R'):
            print('rotating right by', number)
            dial_pos += number
        elif (rotation == 'L'):
            print('rotating left by', number)
            dial_pos -= number
        else:
            print('error')
            break

        print('dial_pos', dial_pos)
        zero_crossed_count = dial_pos//steps
        # print(zero_crossed_count, 'dial_pos',
        #       dial_pos, abs(zero_crossed_count))

        dial_pos %= steps

        cond = if_zero and zero_crossed_count == -1
        if (not(cond) or (cond and dial_pos == 0)):
            count += abs(zero_crossed_count)
            if (abs(zero_crossed_count)):
                print('adding counter by', abs(zero_crossed_count))
            if (dial_pos == 0 and abs(zero_crossed_count) == 0):
                count += 1
                print('adding counter by 1 as dial_pos == 0')

        print('new dial_pos', dial_pos, 'count ', count)
        # if (dial_pos == 0):
        #     count += 1
    print(count)
