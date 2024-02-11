buffer = ['_' for i in range(50)]
gap_size = 10
gap_left = 0
gap_right = gap_size - gap_left - 1
size = 10
def grow(k, position):
    global size, gap_right, gap_left, buffer
    print('-----') 
    print(buffer[:size])
    a = buffer[position:size]
    buffer[position:position+k] = ['_' for i in range(k)]
    buffer[position+k:position+k+size-position] = a
    size += k
    gap_right += k
    print(buffer[:size])

def left(position):
	global gap_left, gap_right, buffer
	while position < gap_left:
		gap_left -= 1
		gap_right -= 1
		buffer[gap_right+1] = buffer[gap_left]
		buffer[gap_left] = '_'

def right(position):
	global gap_left, gap_right, buffer
	while position > gap_left:
		gap_left += 1
		gap_right += 1
		buffer[gap_left-1] = buffer[gap_right]
		buffer[gap_right] = '_'

def move_cursor(position):
	if position < gap_left:
		left(position)
	else:
		right(position)

def insert(input, position):
	global gap_left, gap_right
	len_input = len(input)
	i = 0
	if position != gap_left:
		move_cursor(position)
	while i < len_input:
		if gap_right == gap_left:
			k = 10
			grow(k, position)
		buffer[gap_left] = input[i]
		gap_left += 1
		i += 1
		position += 1

for i in range(10):
	buffer[i] = '_'

print("Initializing the gap buffer with size 10")
print(buffer[:size])

input_str = "GEEKSGEEKS"
position = 0

insert(input_str, position)

print("Inserting a string to buffer: GEEKSGEEKS")
print("Output:", buffer[:size])

input_str = "FOR"
position = 5

insert(input_str, position)

print("\n")
print("\n")

print("Inserting a string to buffer: FOR")
print("Output: ", end="")
for i in range(size):
	print(buffer[i], end=" ")

