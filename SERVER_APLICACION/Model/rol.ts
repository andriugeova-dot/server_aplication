import { conexion } from "./conexion.ts";

interface rolData{
    idRol:number|null;
    nombreRol:string;
}

export class Rol{

    public _ObjRol:rolData|null;
    public _idRol:number|null;

    constructor(ObjRol:rolData|null=null,idRol:number|null=null){
        this._ObjRol=ObjRol;
        this._idRol=idRol;
    }

    public async SeleccionarRoles():Promise<rolData[]>{
        const {rows:roles}=await conexion.execute("SELECT * FROM Rol");
        return roles as rolData[];
    }

}