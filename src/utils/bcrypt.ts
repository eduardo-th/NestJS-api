import * as bcrypt from 'bcrypt'

export async function hashPassword(password: string): Promise<string>{
    const saltRounds = 10;
    const hash = bcrypt.hash(password, saltRounds)
    return hash
}

export async function comparePassword(password: string, hash: string): Promise<boolean>{
    const result = bcrypt.compare(password, hash)
    return result
}