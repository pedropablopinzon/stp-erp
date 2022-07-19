import { Injectable } from '@nestjs/common';

const mensajes: string[] = [];

@Injectable()
export class AppService {
  getData(): { message: string; values: string[] } {
    return {
      message: 'Estoy leyendo! Pedro Pinzon Fullstack Developer!!!',
      values: mensajes,
    };
  }

  addData(): { message: string; values: string[] } {
    mensajes.push(new Date().toString());
    return {
      message: 'Estoy agregando! Pedro Pinzon Fullstack Developer!!!',
      values: mensajes,
    };
  }

  updateData(index: number, data: any): { message: string; values: string[] } {
    mensajes[index] = data.newValue;
    return {
      message: 'Estoy actualizando! Pedro Pinzon Fullstack Developer!!!',
      values: mensajes,
    };
  }

  deleteData(index: number): { message: string; values: string[] } {
    mensajes.splice(index, 1);
    return {
      message: `Estoy eliminando! Elimine este registro: (${index}) Pedro Pinzon Fullstack Developer!!!`,
      values: mensajes,
    };
  }
}
