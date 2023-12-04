string="ababab"

size=len(string)

while True:
    alf={}
    for i in range(size):
        print(i)
        print(string)
        if string[i] in alf:
            print(size)
            size-=1
            string=string[:alf[string[i]]]+string[alf[string[i]]+1:]
            break
            
        else:
            alf[string[i]]=i
    break
print(string)
print(size)