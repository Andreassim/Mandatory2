import db from "./connection.js";
import bcrypt from "bcrypt";

const isDeleteMode = process.argv.findIndex((argument) => argument === "delete_mode") === -1 ? false : true;

if(isDeleteMode){
    await db.exec('DROP TABLE IF EXISTS users')
    await db.exec('DROP TABLE IF EXISTS permissions')
}

await db.exec(
    `
    CREATE TABLE IF NOT EXISTS users
    (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL,
        password TEXT NOT NULL
    )
    `
);

await db.exec(
    `
    CREATE TABLE IF NOT EXISTS permissions
    (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        is_admin BOOLEAN NOT NULL,
        user_id INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users (id)
    )
    `
);

if(isDeleteMode) {
    const adminPassword = await bcrypt.hash("admin", 12);

    
    await db.exec(`INSERT INTO users (email, password) VALUES ("admin@admin.com", "${adminPassword}")`);


    await db.exec(`INSERT INTO permissions (user_id, is_admin) VALUES (1, True)`);

}