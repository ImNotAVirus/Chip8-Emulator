import CPU from './cpu';
import { IOpcodeOptions } from './interfaces';

export function NOP(options: IOpcodeOptions): boolean
{
    return true;
}

export function CLS(options: IOpcodeOptions): boolean
{
    const { cpu } = options;

    cpu.canvasManager.clear();
    return true;
}

export function RET(options: IOpcodeOptions): boolean
{
    const { cpu } = options;

    cpu.programCounter = cpu.popStack();
    return false;
}

export function SE_Vx_Byte(options: IOpcodeOptions): boolean
{
    const { cpu, byte2, byte3, byte4 } = options;
    const byte = (byte3 << 4) + byte4;

    if (cpu.getRegister(byte2) === byte)
        cpu.increaseProgramCounter(2);
    return true;
}

export function SNE_Vx_Byte(options: IOpcodeOptions): boolean
{
    const { cpu, byte2, byte3, byte4 } = options;
    const byte = (byte3 << 4) + byte4;

    if (cpu.getRegister(byte2) !== byte)
        cpu.increaseProgramCounter(2);
    return true;
}

export function SE_Vx_Vy(options: IOpcodeOptions): boolean
{
    const { cpu, byte2, byte3 } = options;
    const reg1 = cpu.getRegister(byte2);
    const reg2 = cpu.getRegister(byte3);

    if (reg1 === reg2)
        cpu.increaseProgramCounter(2);
    return true;
}

export function LD_Vx_Byte(options: IOpcodeOptions): boolean
{
    const { cpu, byte2, byte3, byte4 } = options;
    const byte = (byte3 << 4) + byte4;

    cpu.setRegister(byte2, byte);
    return true;
}

export function ADD_Vx_Byte(options: IOpcodeOptions): boolean
{
    const { cpu, byte2, byte3, byte4 } = options;
    const byte = (byte3 << 4) + byte4;

    cpu.setRegister(byte2, cpu.getRegister(byte2) + byte);
    return true;
}
