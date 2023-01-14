export interface Credentials {
    email: string;
    password: string;
}

export interface Proyecto{
    id?:number,
    nombre?: string;
    descripcion:string;
    fecha_inicio:string;
    fecha_fin:string;
    link:string;
    url_image?:string;
    id_persona?:number;
}