import Layout from "../layout/Layout"
import { useEffect } from "react"
import useQuisco from "../hooks/useQuisco"
import { useCallback } from "react"
import { toast } from 'react-toastify'
import { formatearDinero } from "../helpers"



export default function Total (){

    const {pedido, colocarOrden, nombre, setNombre, total} = useQuisco()

    const comprobarPedido = useCallback (() =>{
        return pedido.length === 0 || nombre === '' || nombre.length < 3;
    },[pedido, nombre])

/*-------------------------------------------------*/

    useEffect(() => {
        comprobarPedido()
    }, [pedido, comprobarPedido])

/*-------------------------------------------------*/

  
    return (
        <Layout pagina='Total y onfirmar pedido'>

            <h1 className="text-4xl font-black ">Total y confirmar pedido</h1>
            <p className="text-2xl my-10">Confirma tu pedido a continuacion</p>

            <form onSubmit={colocarOrden}>

                <div>
                    <label className="block uppercase text-slate-800 font-bold">Nombre</label>
                    <input type='text' className="bg-gray-200 w-full lg:w-1/3 mt-3 p-2 rounded-md" value={nombre} onChange={e => setNombre(e.target.value)}/>
                </div>

                <div className="mt-10">

                    <p className="text-2xl">Total a pagar: {''} <span className="font-bold">{formatearDinero(total)}</span></p>

                </div>

               <div className="mt-2">
                    <input type='submit' className= {`${comprobarPedido() ? 'bg-indigo-100' : 'bg-indigo-600 hover:bg-indigo-800' } w-full  lg:w-auto uppercase font-bold px-5 py-2 rounded text-white`} value='Confirmar pedido' disabled = {comprobarPedido()} />    
               </div> 

            </form>
            
        </Layout>
    )
    
}