import { User } from '../models/User';
import {uuid as uuidv4} from 'uuidv4';
import bcrypt from 'bcrypt'
import {readAllUsers, writeToJsonFile} from '../DAL/userJson.js'
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'yourSecretKey';



export async function getAllUsers(): Promise<User[]> {
    return await readAllUsers();
}


export async function findUserById(userId: string): Promise<User | null> {
    const users: User[] = await readAllUsers();
    const userFind = users.find((u) => u.id === userId);
    return userFind ? userFind : null;
}


export async function createUser(name: string, password:string): Promise<User> {
    const Users: User[] = await getAllUsers();
    const newUser: User = {
        id: uuidv4(),
        username: name,
        passwordHash: await bcrypt.hash(password, 10)
    };
    Users.push(newUser);
    await writeToJsonFile(Users);
    return newUser;
}


export function createToken(userId: string): string {
    const token = jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: '1h' }); 
    return token;
}


export function verifyToken(token: string): { id: string } | null {
    try {
        const decoded = jwt.verify(token, SECRET_KEY) as { id: string };
        return decoded; 
    } catch (error) {
        console.error('Invalid token:', error);
        return null;
    }
}