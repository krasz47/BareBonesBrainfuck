# The BareBonesBrainfuck Interpreter
An 'interpreter' for the Bare Bones programming language as defined by ['Computer Science: an Overview'](http://www.amazon.co.uk/Computer-Science-Overview-Glenn-Brookshear/dp/0321544285/ref=sr_1_1?ie=UTF8&s=books)
Made for the Space Cadets Uni of Southampton challenges, but I thought that instead of going for a fast or efficient solution... I would instead go for something novel.

This is a program that takes the barebones language and 'compiles' it into the [brainfuck esolang](https://en.wikipedia.org/wiki/Brainfuck) and then executes this to run the original bare bones code.

### What is Bare Bones?

Bare bones has three commands for manipulating variables:
```
clear X;
incr X;
decr X;
```
Which resets a variable X to 0, increments a variable X by 1, and decrements a variable X by 1 respectively. 
It also contains one control sequence, a simple loop (which can be nested):
```
while X not 0 do;
...
end;
```
This runs the code inside the code block until the variable X reaches 0.

So you can likely see the familiarity to brainfuck from these instructions alone; why using brainfuck is simply a great idea for this.

###### This is me reaching at the thinnest of strands to justify using brainfuck for anything
