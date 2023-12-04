mondict=[True,-2,True,False,True,False,True,True,False,True,False,True]
month=0
monhalf=0
days=0
offset=1
while monhalf not in range(1,3) or month not in range(1,13) or len(str(year))>7:
    try:
        year=int(input("Enter year(eg.2023): "))
        month=int(input("Enter month number(1-12): "))
        monhalf=int(input("Enter 1st or 2nd half of month(1-2) : "))
    except:
        print("please put numbers only")
    
    if monhalf==1:
        days=15
    elif monhalf==2:
        days=15+int(mondict[month-1])
        if year%4==0:
            days+=1
print('calculating amount for '+str(monhalf)+" half "+str(month)+" 2023")
name = input("Enter user name: ")
Total = 0.0
arr=[]
month=str(month)
if monhalf==2:
    offset=16
for i in range(days*2):
    Date =str((i//2)+offset )
    if i%2==0:
        half = 'Morning-Shift'
    else:
        half = 'Evening-Shift'
    amount=""
    while amount=="":
        amount = input('Enter for '+ str(Date)+'-'+month+" "+half+': ')
    arr.append(amount)
    Total+=float(amount)
for i in range(days*2):
    Date =str((i//2)+offset )
    if i%2==0:
        half = 'Morning-Shift'
    else:
        half = 'Evening-Shift'
    print(str(Date)+'-'+month+" "+half+': '+str(arr[i]))
print('----------')
print("Total amount for "+name+" is "+str(Total))