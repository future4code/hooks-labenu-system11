import { BaseDatabase } from "./BaseDatabase";

export class migrations extends BaseDatabase{
    public async createTableTurma(){
        await BaseDatabase.connection.raw(`
            CREATE TABLE IF NOT EXISTS labenusystem_turmas
        `)
    }
}