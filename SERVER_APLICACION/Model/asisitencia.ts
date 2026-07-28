import { conexion } from "./conexion.ts";

interface asistenciaData{
    idAsistencia:number|null;
    idAprendiz:number;
    idAsignatura:number;
    fecha:Date;
    horaEntrada:string;
    horaSalida:string;
    estado:string;
    observacion:string;
}

export class Asistencia{

    public _ObjAsistencia:asistenciaData|null;
    public _idAsistencia:number|null;

    constructor(ObjAsistencia:asistenciaData|null=null,idAsistencia:number|null=null){
        this._ObjAsistencia=ObjAsistencia;
        this._idAsistencia=idAsistencia;
    }

    public async SeleccionarAsistencias():Promise<asistenciaData[]>{
        const {rows:asistencias}=await conexion.execute("SELECT * FROM Asistencia");
        return asistencias as asistenciaData[];
    }

}