import random
from collections import Counter

#global variable with usable alphabet
alphabet = 'abcdefghijklmnopqrstuvwxyz '

# Caesar cipher + decipher
def CaesarCipher(p,k):
    x = ""
    for i in range(len(p)):
        c = p[i]
        if(c.isupper()):
            x += chr((ord(c) + k - 65) % 26 + 65)
        elif(c != " "):
            x += chr((ord(c) + k - 97) % 26 + 97)
        else:
            x += c
    return x


""" print("Caesar Cipher:\n")
x = (CaesarCipher("Hello World", 16));
print(x)
y = (CaesarCipher(x,26-16))
print(y)  """

# key generation for Vigenere ciphering
def generateKey(p, k):
    flag = False
    k = list(k)
    if len(p) == len(k):
        flag = True
    else:
        for i in range(len(p) - len(k)):
            k.append(k[i % len(k)])
    for i in range(len(p)):
            if(p[i].isupper()):
                k[i] = k[i].upper()
            else:
                k[i] = k[i].lower()
    return("" . join(k))

# Vigenere cipher
def VCipher(p, k):
    x = ""
    for i in range(len(p)):
        c = p[i]
        c2 = k[i]
        if(c.isupper()):
            y = chr((ord(c) + ord(c2) - 65) % 26 + 65)
        elif(c != " "):
            y = chr((ord(c) + ord(c2) - 97) % 26 + 97)
        else:
            y = c
        x += y
    return x

# Vigenere decipher
def DeVCipher(p, k):
    x = ""
    for i in range(len(p)):
        c = p[i]
        c2 = k[i]
        if(c.isupper()):
            y = chr((ord(c) - ord(c2) - 65) % 26 + 65)
        elif(c != " "):
            y = chr((ord(c) - ord(c2) - 97) % 26 + 97)
        else:
            y = c
        x += y
    return x

""" print("\nVigenere Cipher:\n")
k = generateKey("Hello World","YEET")
print(k)
x = (VCipher("Hello World", k));
print(x)
y = (DeVCipher(x,k));
print(y)  """

# one-time pad
def OneTimePad(p):
    k = ""
    for i in range(len(p)):
        x = 0
        if(p[i].isupper()):
            x = random.randint(65,90)
            k += chr(x)
        elif(p[i] != " "):
            x = random.randint(97,122)
            k += chr(x)
        else:
            k += p[i]
    return [VCipher(p,k), k]

""" print("\nOne Time Pad:\n")
OTP = OneTimePad("Good Morning Chicago")
print(OTP[0])
print(OTP[1])
print(DeVCipher(OTP[0],OTP[1])) """

# file reader
def fileReader(file):
    with open(file) as f:
        lines = f.readlines()
    return lines[0]

# Caesar cipher that works with a specific alphabet, can decipher if the second parameter is 27-key
# USAGE: (message, key)
#           message: string input to cipher
#           key: int between 1 - 27
# EXAMPLE: CaesarCipherV2('hello world', 16)
# EXAMPLE: CaesarCipherV2('xuaadpldgat', 27-16)
def CaesarCipherV2(msg, k):
    x = ''
    cipher = alphabet[k:] + alphabet[:k]

    msg = msg.lower()

    for i in msg:
        ind = alphabet.index(i)
        x += cipher[ind]

    return x

# Vigenere cipher that works with a specific alphabet, can decipher if the second parameter is 27-key
# USAGE: (message, key)
#           message: string input to cipher
#           key: array of n ints, each between 1 - 27
# EXAMPLE: VigenereCipherV2('hello world', [16,12,3,21])
# EXAMPLE: VigenereCipherV2('xqofdlzigxg', [27-16,27-12,27-3,27-21])
def VigenereCipherV2(msg, k):
    x = ''
    cipher = []
    key = 0

    msg = msg.lower()
    
    for i in k:
        cipher.append(alphabet[i:] + alphabet[:i])

    for i in msg:
        ind = alphabet.index(i)
        x += cipher[key][ind]

        if key == len(k)-1:
            key = 0
        else:
            key += 1

    return x

# deciphers cipher1.txt : WORKS
def cipherOne():
    filetext = fileReader('cipher1.txt')
    res = Counter(filetext)
    res = max(res, key = res.get)

    ind = alphabet.index(res) + 1

    with open('decipher1.txt', 'w') as f:
        f.write(CaesarCipherV2(filetext, 27-ind))

cipherOne()

# deciphers cipher2.txt : DOESN'T WORK
def cipherTwo():
    filetext = fileReader('cipher2.txt')

print(VigenereCipherV2('xqofdlzigxg', [27-16,27-12,27-3,27-21]))
