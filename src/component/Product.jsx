import React, {useState, useEffect}from 'react' ;
import { useDispatch } from 'react-redux';
import { addCart } from '../redux/action';
import { Skeleton } from '@material-ui/lab';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Product = () => {
    const {id} = useParams ();
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);


    const dispatch = useDispatch();
    const addProduct = (product)=> {
        dispatch(addCart(product));
    }








    useEffect(() => {
        const getProduct = async () => {
            setLoading(true);
            const response = await fetch(`https://fakestoreapi.com/products/${id}`);
            setProduct(await response.json());
            setLoading(false);
        }
        getProduct();
    },[]);


    const Loading = ()=>{
        return(
            <>
            <div className="col-md-6">
                <Skeleton height={400}/>

            </div>
            <div className="col-md-6">
                <Skeleton height={50} width={300}   style={{lineHeight:2}} />
                <Skeleton height={75}/>
                <Skeleton height={25} width ={150}/>
                <Skeleton height={50}/>
                <Skeleton height={150}/>
                <Skeleton height={50} width={100}/>
                <Skeleton height={50} width ={100} style={{marginLeft:6}}/>
            </div>
            </>
        )
    }
    const ShowProduct =() =>{
        return(
            <>
            <div className="col-md-6">
                <img src={product.image} alt={product.title} height="400px" width="400px"/>
            </div>

            <div className="col-md-6">
                <h4 className='text-uppercase text-black-75'>{product.category}</h4>
                <h1 className='display-5'>{product.title}</h1>
                <p className='lead fw-bolder'> Rating {product.rating && product.rating.rate}  
                 <i className='fa fa-star'></i> </p>
                 <h3 className="display-6 fw-bold my-4">
                  $  {product.price} </h3>
                  <p className='lead'>{product.description}

                  </p>

                  <button className='btn btn-outline-primary' onClick={()=> addProduct(product)}> Add to Card</button>
                  <Link to="/cart" className='btn btn-primary ms-2'> Go to Card</Link>

                 
            </div>



            </>
        )
    }





    return(
        <div>
            <div className="container">
                <div className="row">
                    {loading ? <Loading/> : <ShowProduct/>}
                </div>
            </div>

        </div>
    );
}

export default Product;