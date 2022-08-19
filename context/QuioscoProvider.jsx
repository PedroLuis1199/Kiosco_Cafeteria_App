
import axios from 'axios'
import { createContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

const QuioscoContext = createContext()

const QuioscoProvider = ({children}) => {

    const [categorias, setCategorias] = useState([])
    const [categoriaActual, setCategoriaActual] = useState({})
    const [producto, setProducto] = useState({})
    const [modal, setModal] = useState(false)
    //state para el pedido
    const [pedido, setPedido] = useState([])
    const [nombre, setNombre] = useState('')
    const [total, setTotal] = useState(0)

    const router = useRouter()


    const obtenerCategorias = async () => {

        const {data} = await axios('/api/categorias')

        setCategorias(data)

    }

    useEffect(()=>{
        obtenerCategorias()
    }, [])

    //effect para que exista una ctegoria por defecto cuando se ingresa a la pagina
    useEffect(()=>{
        setCategoriaActual(categorias[0])
    }, [categorias])

    //effect para el total de la compra
    useEffect(() => {

        const nuevoTotal = pedido.reduce((total, producto) => (producto.precio  * producto.cantidad) + total, 0)

        setTotal(nuevoTotal)

    }, [pedido])

    const handleClickCategoria = id => {
        const categoria = categorias.filter(cat => cat.id === id)
        setCategoriaActual(categoria[0])
        router.push('/')

    }

    const handleSetProducto = producto =>{
        setProducto(producto)
    }

    const handleChangeModal = () =>{
        setModal(!modal)
    }

    //el codigo antes de producto (categoriaId, imagen) es para sacar esos atributos del state de producto y que en el pedido se tomen los atributos que son necesarios
    const handleAgregarPedido = ({categoriaId, ...producto}) => {

        if(pedido.some(productoState => productoState.id === producto.id)){
            //si el producto existe se actualiza la cantidad

            const pedidoActualzido = pedido.map(productoState => productoState.id === producto.id ? producto : productoState)

            setPedido(pedidoActualzido)
            toast.success('Guardado correctamente')
        }
        else{
            setPedido([...pedido, producto])
            //alerta
            toast.success('Agregado al pedido')

        }

        setModal(false)

      
       
        
    }

    const handleEditarCantidades = id => {

        const pedidoActualizar = pedido.filter(producto => producto.id === id) 

        setProducto(pedidoActualizar[0])

            setModal(!modal)
    }

    const handleEliminarProducto = id => {

        const pedidoActualizado = pedido.filter(producto => producto.id !== id) 

        setPedido(pedidoActualizado)

        toast.info('Producto borrado del pedido')

            
    }

    const colocarOrden = async (e) => {

        e.preventDefault();

        try {
              await axios.post('/api/ordenes',{pedido, nombre, total, fecha: Date.now().toString()})

           //Resetaer app luego de enviar una orden 
           setCategoriaActual(categorias[0])
           setPedido([])
           setNombre('')
           setTotal(0)

           toast.success('Pedido realizado con exito')

           //devolver al cliente al menu
           setTimeout(() => {
               router.push('/')
           }, 2000);
       


        } catch (error) {
            console.log(error)
        }
    
        
       }

  

  return (

   <QuioscoContext.Provider value = {{categorias, categoriaActual,  handleClickCategoria , producto, handleSetProducto, modal, handleChangeModal, handleAgregarPedido, pedido, handleEditarCantidades, handleEliminarProducto, colocarOrden, nombre, setNombre, total}}>
        {children}
   </QuioscoContext.Provider> 

  )
}

export {
QuioscoProvider
}

export default QuioscoContext
