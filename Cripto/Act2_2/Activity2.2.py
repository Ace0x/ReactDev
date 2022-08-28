import random
from collections import Counter

#global variable with usable alphabet
alphabet = 'abcdefghijklmnopqrstuvwxyz '

# file reader
def fileReader(file):
    with open(file) as f:
        lines = f.readlines()
    return lines[0]

# Caesar cipher that works with a specific alphabet, can decipher if the third parameter is 'd'
# USAGE: (message, key, mode)
#           message: string input to cipher
#           key: int between 1 - 27
#           mode: char that indicates whether to encrypt or decrypt
# EXAMPLE: CaesarCipherV2('hello world', 16)
# EXAMPLE: CaesarCipherV2('xuaadpldgat', 16, 'd')
def CaesarCipherV2(msg, k, mode = 'e'):
    x = ''
    if mode == 'd':
        k = len(alphabet) - k
    cipher = alphabet[k:] + alphabet[:k]
    msg = msg.lower()
    for i in msg:
        ind = alphabet.index(i)
        x += cipher[ind]
    return x

# Vigenere cipher that works with a specific alphabet, can decipher if the third parameter is 'd'
# USAGE: (message, key, mode)
#           message: string input to cipher
#           key: array of n ints, each between 1 - 27
#           mode: char that indicates whether to encrypt or decrypt
# EXAMPLE: VigenereCipherV2('hello world', [16,12,3,21])
# EXAMPLE: VigenereCipherV2('xqofdlzigxg', [16,12,3,21], 'd')
def VigenereCipherV2(msg, k, mode = 'e'):
    x = ''
    cipher = []
    key = 0
    if mode == 'd':
        for i in range(len(k)):
            k[i] = len(alphabet) - k[i]
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

# One-time pad for ciphering with Vigenere
def oneTimePadV2(msg):
    k = []
    for i in msg:
        k.append(random.randint(1,27))
    return [VigenereCipherV2(msg,k),k]

# deciphers cipher1.txt : WORKS
def cipherOne():
    filetext = fileReader('cipher1.txt')
    res = Counter(filetext)
    res = max(res, key = res.get)
    ind = alphabet.index(res) + 1
    with open('decipher1.txt', 'w') as f:
        f.write(CaesarCipherV2(filetext, ind, 'd'))

# deciphers cipher2.txt : WORKS
def cipherTwo():
    filetext = fileReader('cipher2.txt')
    key_length = 4
    c = 0
    seq = [[],[],[],[]]
    frq = []
    for i in filetext:
        if c >= key_length:
            c = 0
        seq[c].append(i)
        c += 1
    for i in seq:
        s = ""
        res = Counter(s.join(i))
        res = max(res, key = res.get)
        frq.append(res)
    for i in range(len(frq)):
        index = alphabet.index(frq[i]) + 1
        frq[i] = index
    with open('decipher2.txt', 'w') as f:
        f.write(VigenereCipherV2(filetext, frq, 'd'))

cipherOne()
cipherTwo()

# ALTERNATE IMPLEMENTATIONS OF CIPHERS
# --------------------------------------------------------------------------------

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

# --------------------------------------------------------------------------------