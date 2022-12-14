import React, { useState, useEffect } from 'react';
import { Skeleton } from '@material-ui/lab';
import { Link } from 'react-router-dom';


const Products = () => {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState(data);
    const [loading, setLoading] = useState(false);
    let componentMounted = true;


    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            const response = await fetch("https://fakestoreapi.com/products");
            if (componentMounted) {
                setData(await response.clone().json());
                setFilter(await response.json());
                setLoading(false);
                console.log(filter)

            }
            return () => {
                componentMounted = false;
            }
        }
        getProducts();
    }, []);

    const Loading = () => {
        return (
            <>
               <div className="col-md-e">
                <Skeleton height={300}/>
               </div>
            </>
        )
        
    }
    const filterProduct= (cat) =>{
        const updatedList = data.filter((x)=>x.category === cat);
        setFilter(updatedList);
    }
    const ShowProducts = () => {
        return (
            <>
                <div className='buttons d-flex justify-content-center md-5 pb-5'>
                    <button className="btn btn-outline-dark me-2 " onClick={()=>setFilter(data)}>All</button>
                    <button className="btn btn-outline-dark me-2" onClick={()=>filterProduct("men's clothing")}>Men's Wears</button>
                    <button className="btn btn-outline-dark me-2" onClick={()=>filterProduct("women's clothing")} >Women's Wears</button>
                    <button className="btn btn-outline-dark me-2"  onClick={()=>filterProduct("jewelery")}>Jewelery</button>
                    <button className="btn btn-outline-dark me-2"  onClick={()=>filterProduct("electronics")}>Electronics</button>
                    </div>

                     {filter.map((product) => {
                        return (
                            <>
                                <div className="col-md-3 mb-4">
                                    <div class="card h-100 text-center p-4 bg-info" key={product.id}>
                                        <img src={product.image} class="card-img-top" alt={product.title} height="200px" />
                                        <div class="card-body ">
                                            <h5 class="card-title md-0 ">{product.title.substring(0,12)}</h5>
                                            <p class="card-text">${product.price}</p>
                                            <Link to={`/products/${product.id}`} class="btn btn-outline-dark">Buy Now</Link>
                                        </div>
                                    </div>

                                </div>
                            </>
                        )
                     })}
 

                 
                </>
        );
    };

    return (
        <div>
            <div className="container my-5 py-5" >
                <div className="row">
                    <div className="col-12">
                        <h1 className="display-6 fw-bolder text-center">Latest Product</h1>
                        <hr />
                    </div>
                </div>
                <div className='row justify-content-center'>
                    {loading ? <Loading /> : <ShowProducts />}
                </div>


            </div>


        </div>
    );
}


export default Products;