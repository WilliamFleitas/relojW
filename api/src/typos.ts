// enum alarmDays {
//     Once,
//     Domingo,
//     Lunes,
//     Martes,
//     Miercoles,
//     Jueves,
//     Viernes,
//     Sabado
// }
export interface userType {
    username: string;
    password: string;
    role: "none" | "user" | "admin";
    id: string;
}

export interface alarmType {
    userId: string;
    id: string;
    hour: string;
    description: string;
    alarmDays: string;
}

export interface ServerToClientEvents {
    noArg: () => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
  }
  
  export interface ClientToServerEvents {
    hello: () => void;
  }
  
  export interface InterServerEvents {
    ping: () => void;
  }
  
  export interface SocketData {
    name: string;
    age: number;
  }

