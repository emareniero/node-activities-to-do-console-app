// se recomienda poner primer las importaciones de paquetes y luego las nuestras
import colors from "colors";
import { inquirerMenu, mostrarListadoCheckList, confirmar, pausa, leerInput, listadoTareasBorrar } from "./helpers/inquirer.js";
import { Tareas } from "./models/tareas.js";
import { guardarDB, leerDB } from "./helpers/guardarArchivo.js";

console.clear();

const main = async () => {
  let opt = "";
  const tareas = new Tareas();

  const tareasDB = leerDB();

  if (tareasDB) {
    //cargar tareas
    //Establecer las tareas
    tareas.cargarTareasFromArray(tareasDB);
  }

  do {
    //Imprimir el menu
    opt = await inquirerMenu(); //el await es par esperar que mostrar menu tenga una respuesta

    switch (opt) {
      case "1":
        const desc = await leerInput("Descripcion:");
        tareas.crearTarea(desc);

        break;
      case "2":
        tareas.listadoCompleto();
        break;
      case "3": //Listar completadas
        tareas.lsitarPendientesCompletadas(true);
        break;
      case "4": // Listar pendientes
        tareas.lsitarPendientesCompletadas(false);
        break;
      case "5": // Completado | pendientes
        const ids = await mostrarListadoCheckList( tareas.listadoArr );
        tareas.toggleCompletadas(ids)
        break;
      case "6": // Borrar tarea(s)
        const id = await listadoTareasBorrar(tareas.listadoArr);
        // Preguntar si esta seguro de borrar el dato
        if (id !== '0') {
          const ok = await confirmar("Estas seguro que desas borrar?");
          if (ok) {
            tareas.borrarTarea(id);
            console.log("Tarea borrada");
          }
        }

        break;
    }

    guardarDB(tareas.listadoArr);

    await pausa();
  } while (opt !== "0");
};

main();
