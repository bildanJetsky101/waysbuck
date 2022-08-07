import Product from '../dataToping/toping'
import DataProduct from "../dataProduct/product";
import { useParams } from 'react-router';
import { useContext } from 'react';
import Toping from '../components/Toping';
import dataToping from '../dataToping/toping'
import { createContext, useState } from 'react';
import NavbarList from '../components/Navbar';
import { UserContext } from '../context/UserContext';
import CartAlert from '../components/CartAlert';

export default function ProductDetail (){

    const addCart = createContext()
    const [state, dispatch] = useContext(UserContext)
    const [cart, setCart] = useState(false)
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)

    const [dataCart, setDataCart] = useState({
        id:'',
        title:'',
        topping:[]
    })

    let { id } = useParams();

    const idParams = parseInt(id)
    const product = DataProduct.find(({id})=> id === idParams)

    console.log(product)

    const topping = ['Bubble Tea', 'Brown Sugar']

    const addToCart = () => {
        if(state.isLogin === false){
            return setShow(true)
        }
        setCart(true)
        setDataCart({
            id: product.id,
            title: product.title,
            topping: topping
        })

        const data ={
            email:state.user.username,
            password:state.user.password,
            cartStatus:true
        }

        dispatch({
            type: 'ADD_CART',
            userStat: 'user',
            payload: data

          })
        console.log(state)
    }
    console.log(state.user.email)
    console.log(state.status)
    console.log(state.user.cartStatus)

    return(
        <div>
            <NavbarList />
            <CartAlert show={show} handleClose={handleClose}/>
            <div style={styles.container}>
                <img style={styles.image} src={product.image} alt="" />
                <div style={styles.infoContainer}>
                    <h1 style={{fontSize:'48px', fontWeight:'900', color:'rgba(189, 7, 7, 1)'}}>{product.title}</h1>
                    <p style={{marginBottom:'3rem', fontSize:'24px', color:'rgba(189, 7, 7, 1)'}}>Rp. {product.price}</p>
                    <p style={{fontSize:'24px', fontWeight:'800', color:'rgba(151, 74, 74, 1)'}}>Toping</p>
                    <div style={styles.topingWrapper}>
                        {dataToping?.map((item, index)=>(
                            <Toping item={item} key={index}/>
                        ))}
                    </div>
                    <div style={styles.total}>
                        <p>Total</p>
                        <p>Rp. 245.000</p>
                    </div>
                    <button onClick={() => addToCart()} style={styles.buttonCart}>Add Cart</button>
                </div>
            </div>
        </div>
    )
}

const styles = {
    container: {
        //backgroundColor:'wheat',
        paddingTop:'3rem',
        margin:'auto',
        display:'flex',
        justifyContent:'space-between',
        width:'85%', 
        flexDirection:'row',
        marginBottom:'5rem'
    },
    infoContainer:{
        //backgroundColor:'aqua',
        width:'58%',
        display:'flex',
        flexDirection:'column',
    },
    topingWrapper: {
        display:'flex',
        flexDirection:'row',
        flexWrap:'wrap',

    },
    buttonCart: {
        height:'40px',
        backgroundColor:'rgba(189, 7, 7, 1)',
        borderRadius:'5px',
        color:'white',
        border:'2px solid rgba(189, 7, 7, 1)'
    },
    image : {
        width:'436px',
        height:'555px'
    },
    total: {
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        fontSize:'24px',
        fontWeight:'900',
        marginBottom:'2rem',
        color:'rgba(151, 74, 74, 1)'
    },
    topingWrapper: {
        display:'flex',
        flexDirection:'row',
        marginBottom:'1rem',
        flexWrap:'wrap',
        
    }
}