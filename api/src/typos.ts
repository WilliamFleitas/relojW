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

export interface alarmType {
    id: string;
    hour: string;
    description: string;
    alarmDays: string;
}