import  jsonfile  from "jsonfile";
import {User} from '../models/User.js'
const DB_FILE = './data/db.json'





// gets all beepers from DB
export const readAllUsers = async (): Promise<User[]> => {
    const Users: User[] = await jsonfile.readFile(DB_FILE);
    return Users;
};


// write all Users to the DB
export const writeToJsonFile = async (Users: User[]): Promise<void> => {
    await jsonfile.writeFile(DB_FILE, Users, { spaces: 2 });
};