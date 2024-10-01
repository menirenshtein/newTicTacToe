var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { uuid as uuidv4 } from 'uuidv4';
import bcrypt from 'bcrypt';
import { readAllUsers, writeToJsonFile } from '../DAL/userJson.js';
import jwt from 'jsonwebtoken';
const SECRET_KEY = 'yourSecretKey';
export function getAllUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield readAllUsers();
    });
}
export function findUserById(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield readAllUsers();
        const userFind = users.find((u) => u.id === userId);
        return userFind ? userFind : null;
    });
}
export function createUser(name, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const Users = yield getAllUsers();
        const newUser = {
            id: uuidv4(),
            username: name,
            passwordHash: yield bcrypt.hash(password, 10)
        };
        Users.push(newUser);
        yield writeToJsonFile(Users);
        return newUser;
    });
}
export function createToken(userId) {
    const token = jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: '1h' });
    return token;
}
export function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        return decoded;
    }
    catch (error) {
        console.error('Invalid token:', error);
        return null;
    }
}
