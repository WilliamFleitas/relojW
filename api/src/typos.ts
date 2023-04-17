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
    privilege: "none" | "user" | "king"
    id: string;
}

export interface alarmType {
    userId: string;
    id: string;
    hour: string;
    description: string;
    alarmDays: string;
}
