import { conexion } from "./conexion.ts";

interface fichaData{
    idFicha:number|null;
    numeroFicha:string;
    jornada:string;
    idPrograma:number;
}

export class Ficha{

    public _ObjFicha:fichaData|null;
    public _idFicha:number|null;

    constructor(ObjFicha:fichaData|null=null,idFicha:number|null=null){
        this._ObjFicha=ObjFicha;
        this._idFicha=idFicha;
    }

    public async SeleccionarFichas():Promise<fichaData[]>{
        const {rows:fichas}=await conexion.execute("SELECT * FROM Ficha");
        return fichas as fichaData[];
    }

}