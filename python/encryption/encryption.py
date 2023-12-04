import random

plainMsg = input("Enter message to be encrypted: ")

secretSize = len(plainMsg)
secret = [0]*secretSize
# allowed chars are form ! to ~ (in ascii 33 to 126) coz they are printable
for i in range(secretSize):
    secret[i]=random.randint(0,100)

print(secret)

encryptedMsg = list(plainMsg)
for i in range(secretSize):
    encryptedMsg[i]=chr(((ord(encryptedMsg[i])+secret[i])%255))
print(''.join(encryptedMsg))

decryptedMsg = encryptedMsg
for i in range(secretSize):
    decryptedMsg[i]=chr(((ord(encryptedMsg[i])-secret[i])%255))

print(''.join(decryptedMsg))

