import random

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


print("Caesar Cipher:\n")
x = (CaesarCipher("Hello World", 16));
print(x)
y = (CaesarCipher(x,26-16))
print(y) 

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

print("\nVigenere Cipher:\n")
k = generateKey("Hello World","YEET")
print(k)
x = (VCipher("Hello World", k));
print(x)
y = (DeVCipher(x,k));
print(y) 

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

print("\nOne Time Pad:\n")
OTP = OneTimePad("Good Morning Chicago")
print(OTP[0])
print(OTP[1])
print(DeVCipher(OTP[0],OTP[1]))


