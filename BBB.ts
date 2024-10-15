/*
 The Bare Bones Brainfuck Interpreter. 
 Made as a 'joke' to try make some use out of Brainfuck
*/

const compileBrainfuck = (code: string): string => {
    const lines = code.split(";").map(line => line.trim()).filter(line => line.length > 0);
    const brainfuck: string[] = [];
    const variables: { [key : string]: number} = {};
    let arrayPointer: number = 0;
    const loopStack: string[] = [];

    const getVariablePointer = (name: string): number => {
        if (!(name in variables)) {
            if(Object.keys(variables).length > 0){
            variables[name] = variables[Object.keys(variables)[Object.keys(variables).length -1]] + 1;
            } else {
                variables[name] = 0;
            }
        }
        return variables[name];
    }

    lines.forEach(line => {
        const tokens = line.split(" ");
        const command = tokens[0];
        const variable = tokens[1];
        let pointer = getVariablePointer(variable);

        switch (command) {
            case 'clear':
                brainfuck.push(`${((pointer - arrayPointer > 0) ? ">" : "<").repeat(Math.abs(pointer - arrayPointer))}[-]`);
                break;
            case 'incr':
                brainfuck.push(`${((pointer - arrayPointer > 0) ? ">" : "<").repeat(Math.abs(pointer - arrayPointer))}+`);
                break;
            case 'decr':
                brainfuck.push(`${((pointer - arrayPointer > 0) ? ">" : "<").repeat(Math.abs(pointer - arrayPointer))}-`);
                break;
            case 'while':
                brainfuck.push(`${((pointer - arrayPointer > 0) ? ">" : "<").repeat(Math.abs(pointer - arrayPointer))}[`);
                loopStack.push(variable);
                break;
            case 'end':
                pointer = getVariablePointer(loopStack.pop());
                brainfuck.push(`${((pointer - arrayPointer > 0) ? ">" : "<").repeat(Math.abs(pointer - arrayPointer))}`);
                brainfuck.push(`]`);
                break;
            default:
                throw new Error(`KeyWordError: Your keyword doesn't exist lmao`)
        }
        arrayPointer = pointer;
    });

    return brainfuck.join('');
};

const interpretBrainfuck = (code: string) : void => {
    const memory = new Uint8Array(100);
    let pointer: number = 0
    const loopStack: number[] = [];
    let currentInstruction: number = 0;

    while (currentInstruction < code.length) {
        const instruction = code[currentInstruction];

        switch (instruction){
            case ">":
                pointer++;
                break;
            case "<":
                pointer--;
                break;
            case "+":
                memory[pointer]++;
                break;
            case "-":
                memory[pointer]--;
                break;
            case "[":
                if (memory[pointer] === 0) {
                    let bracketPairs: number = 1;
                    while (bracketPairs > 0) {
                        currentInstruction++;
                        if(code[currentInstruction] == '[') bracketPairs++;
                        if(code[currentInstruction] == ']') bracketPairs--;
                    }
                } else {
                    loopStack.push(currentInstruction);
                }
                break;
            case "]":
                if (memory[pointer] !== 0) {
                    currentInstruction = loopStack[loopStack.length - 1];
                } else {
                    loopStack.pop();
                }
                break;
            // Not needed, but in case you want to print stuff?    
            case ".":
                process.stdout.write(String.fromCharCode(memory[pointer]));
                break;
            default:
                break;

        }
        currentInstruction++;
    }

    let columnCount: number = 1;
    memory.forEach( (cell) => {
        const numLen = cell.toString().length;
        if (columnCount == 10){
            process.stdout.write(`${"0".repeat(3-numLen)}${cell}\n`);
            columnCount = 1;
        } else {
            process.stdout.write(`${"0".repeat(3-numLen)}${cell} `);
            columnCount++;
        }
    }); 
}


// Write barebones code here 
const bareBonesCode = `

`;

let compiledBrainfuck: string = ""; 
compiledBrainfuck = compileBrainfuck(bareBonesCode);
//process.stdout.write(`${compiledBrainfuck}\n\n`);
interpretBrainfuck(compiledBrainfuck);
