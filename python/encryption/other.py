import random
s = input("Enter a message strictly including characters form a-z ONLY:- ")
key_len = 1
for i in range(0,len(s)-1):
    key_len_ = key_len*10
key_len_max = 9
for j in range(0,len(s)-1):
    key_len_max = key_len_max*10 + 9

key = random.randint(key_len,key_len_max)
print(f"This is your key:- {key}")

copykey = key
key_list = [] # will help in changing the characters one by one of the input
while copykey!=0: # will make a list of the key by appending the numbers of the key one by one which will be used
    rem = copykey%10
    key_list.insert(0,rem)
    copykey = copykey//10

def encryption(key_list,mes): 
    message = ""
    for i in range(0,len(mes)):
        if(ord(mes[i])+key_list[i]<=122):
            message += chr(ord(mes[i])+key_list[i])
        else:
            temp = ord(mes[i])+key_list[i] - 122
            message += chr(96 + temp)
    return message        
print("The encrypted message is:- ",encryption(key_list,s)) 
