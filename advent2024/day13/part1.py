def parseInput(file):
    machines = file.read().strip().split('\n\n')
    data = []
    for machine in machines:
        try:
            b1_line, b2_line, prize_line = machine.split('\n')

            # print(b1_line,b2_line)
            b1 = b1_line.split(':')[1].strip().split(',')
            b2 = b2_line.split(':')[1].strip().split(',')
            b1x = int(b1[0].split('+')[1].strip())
            b1y = int(b1[1].split('+')[1].strip())
            b2x = int(b2[0].split('+')[1].strip())
            b2y = int(b2[1].split('+')[1].strip())

            # print(b1x,b1y)
            # print(b2x,b2y)
            # Extract and process prize
            prize = prize_line.split(':')[1].strip().split(',')
            px = int(prize[0].split('=')[1].strip())
            py = int(prize[1].split('=')[1].strip())

            data.append([[b1x, b1y], [b2x, b2y], [px, py]])
        except Exception as e:
            print(f"Error parsing machine block: {machine}\n{e}")

    return data


def main(input):
    machines = parseInput(input)
    tokens = 0
    for [b1, b2, p] in machines:
        [b1x, b1y] = b1
        [b2x, b2y] = b2
        [px, py] = p

        a1, b1, c1 = b1x, b2x, px
        a2, b2, c2 = b1y, b2y, py

        # print('A =', a1, 'x + ', b1, 'y = ', c1)
        # print('B =', a2, 'x + ', b2, 'y = ', c2)
        # print('prize at',(px,py))
        solution = solve_system(a1, b1, c1, a2, b2, c2)
        if solution:
            [A, B] = solution
            if is_whole(A) and is_whole(B):
                # print(b1x, b2x)
                # print(f"Solution: A = {A}, B = {B}")
                token = A*3+B
                # print(token)
                tokens += token
        else:
            # this edge case was never used in input
            x_factor = a2/a1
            y_factor = b2/b1
            c_factor = c2/c1
            # print('x',x_factor)
            # print('y',y_factor)
            # print('c',c_factor)
            if x_factor == y_factor and x_factor == c_factor:
                print('coolinear')
                A = c1 // a1
                B = c2 // b2
                B_token = B
                A_token = A*3
                print('A',A)
                print('B',B)
                final_token = 0
                if A<=0: # Consider B
                    # print('B_token',B_token)
                    final_token = B_token
                elif B<=0: # Consider A
                    # print('A_token',A_token)
                    final_token = A_token
                else: # Compare
                    final_token = min(A_token,B_token)
                print('final_token',final_token) 
                tokens += final_token

            elif x_factor == y_factor:
                print('parallel', 0)
                continue

    print(int(tokens))


def is_whole(num):
    if num == int(num):
        return True
    else:
        return False


def solve_system(a1, b1, c1, a2, b2, c2):
    det = a1 * b2 - a2 * b1
    if det == 0:
        return False

    A = (c1 * b2 - c2 * b1) / det
    B = (a1 * c2 - a2 * c1) / det

    return A, B
