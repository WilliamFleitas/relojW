
export interface userType {
    username: string;
    password: string;
    email: string;
    role: "none" | "user" | "admin";
    id: string;
}

export interface alarmType {
    userId: string;
    id: string;
    hour: string;
    description: string;
    alarmDays: string;
    alarmType: string;
    iaMessage: string;
    iaVideo: Blob;
}

export interface ServerToClientEvents {
    noArg: () => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
  }
