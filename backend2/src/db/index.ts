import { Client, SSLMode } from 'ts-postgres';
import { dbConnection } from './dbConnection';

export default class db {
    public static connect(): Promise<dbConnection>  {
        const client = new Client({
            host: "csce-315-db.engr.tamu.edu",
            database: "csce315331_zeta",
            user: "csce315331_zeta_master",
            password: "zeta",
            port: 5432,
            ssl: SSLMode.Disable // <--- this is really really bad, we aren't encrypted when talking to the server
        });
        //
        return client.connect().then(()=>{
            return new dbConnection(client);
        });
    }

    
}
