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

export interface Persona{
    id?:number,
    nombre?: string,
    apellido?:string,
    sobre_mi?:string,
    telefono?:string,
    email?:string,
    id_nacionalidad?:number,
    id_domicilio?:number,
    image_background_header?:string,
    image_perfil?:string,
    fecha_nacimiento?: string
}

