import { Tarea } from "./tarea.js";

class Tareas {
  _listado = {};

  get listadoArr() {
    const listado = [];
    Object.keys(this._listado).forEach((key) => {
      listado.push(this._listado[key]);
    });
    return listado;
  }

  constructor() {
    this._listado = {};
  }

  borrarTarea(id = "") {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }

  cargarTareasFromArray(tareas = []) {
    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }

  crearTarea(desc = "") {
    const tarea = new Tarea(desc);

    this._listado[tarea.id] = tarea;
  }

  listadoCompleto() {
    console.log();
    let pos = 1;
    this.listadoArr.forEach((tarea) => {
      console.log(`${`${pos}.`.green} ${tarea.desc} :: ${tarea.completadaEn ? `Completada`.green : `Pendiente`.red}`);
      pos += 1;
    });
  }

  lsitarPendientesCompletadas(completada = true) {
    console.log();
    let pos = 1;
    this.listadoArr.forEach((tarea) => {
      if (completada) {
        if (tarea.completadaEn) {
          console.log(`${`${pos}.`.green} ${tarea.desc} :: ${`${tarea.completadaEn}`.green}`);
        }
      } else {
        if (!tarea.completadaEn) {
          console.log(`${`${pos}.`.green} ${tarea.desc} :: ${`Pendiente`.red}`);
        }
      }
      pos += 1;
    });
  }

  toggleCompletadas(ids = []) {
    ids.forEach((id) => {
      const tarea = this._listado[id];
      if (!tarea.completadaEn) {
        tarea.completadaEn = new Date().toISOString();
      }
    });

    this.listadoArr.forEach( tarea => {
      if ( !ids.includes(tarea.id)) {
        this._listado[tarea.id].completadaEn = null;
      }
    })

  }
}

export { Tareas };
