result = [41, 34, 57, 51, 48, 43, 42, 39, 32, 18, 14, 40, 8, 42, 32, 35, 42, 54, 39, 50, 48, 37, 16, 38, 48, 49, 55, 40, 41, 32, 37, 32, 14, 32, 32, 28, 44, 12, 35, 25, 32, 32, 10, 45, 6, 47, 2, 43, 39, 38, 45, 34, 54, 23, 21, 52, 21, 28, 23, 33, 56, 32, 20, 27, 42, 34, 46, 54, 34, 43, 5, 42, 44, 23, 8, 25, 7, 32, 41, 50, 34, 3, 43, 4, 16, 44, 33, 52, 32, 4, 61, 43, 42, 59, 2, 21, 2, 45, 39, 32, 25, 26, 15, 35, 18, 54, 9, 25, 47, 33, 13, 32, 44, 13, 39, 22, 44, 49, 2, 42, 32, 24, 39, 7, 32, 32, 38, 18, 22, 32, 26, 35, 22]
max = result[0]
min = result[0]
avg = 0
for i in result:
    if max < i:
        max = i
    if min > i:
        min = i
    avg += i
print("Max : "+str(max))
print("Min : "+str(min))
print("Avg : "+str(max/len(result)*100))
pass_students = 0
for i in result:
    if i > 30: 
        pass_students+=1
print('Pass: ',pass_students)
print('Fail: ',len(result)-pass_students)
