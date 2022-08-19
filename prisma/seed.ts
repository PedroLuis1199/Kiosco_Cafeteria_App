import { categorias } from "./data/categorias";
import { productos } from "./data/productos";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const main = async () : Promise<void> =>{

        try {

            //este codigo agrega las categorias a la bd
            await prisma.categoria.createMany({
                data: categorias
            })

            //este codigo agrega los productos a la bd
            await prisma.producto.createMany({
                data: productos
            })
            
        } catch (error) {
            console.log(error)
        }
}

main()