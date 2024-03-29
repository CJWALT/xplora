import React, { useState } from 'react' 
import List from '../../components/List/List'
import { useParams } from 'react-router-dom'
import './Products.scss'
import useFetch from '../../hooks/useFetch'


const Products = () =>{

    const catId = parseInt(useParams().id)


    const [maxPrice, setMaxPrice] = useState(1000)
    const [sort, setSort] = useState('asc')
    const [selectedSubCats, setSelectedSubCats] = useState([])

    const {data, loading, error} = useFetch(`/sub-categories?[filters][categories][id][$eq]=${catId}`)

    const handleChange = (e) =>{
        const value = e.target.value; 
        const isChecked = e.target.checked 
        setSelectedSubCats (isChecked ? [...selectedSubCats, value] : 
            selectedSubCats.filter((item)=>item !== value))
    }


    return (
        <div className="products">
            <div className="left">
                <div className="filterItem">
                    <h2>Product Categories</h2>
                    {error ? <div> Something went wrong</div> 
                        : 
                        (loading ? <div>loading </div> 
                    : 
                        data?.map((item) => ( 
                            <div className="inputItem" key={item.id}>
                                <input type="checkbox" name="" value={item.id} id={item.id} onChange={handleChange} />
                                <label htmlFor={item.id}>{item.attributes.title}</label>
                            </div>
                        )))}
                    
                    
                </div>
                <div className="filterItem">
                    <h2>Filter by price</h2>
                    <div className="inputItem">
                        <span>0</span>
                        <input type="range" name="" id="" min={0} max={1000} onChange={(e)=>setMaxPrice(e.target.value)} />
                        <span>{maxPrice}</span>
                    </div>
                </div>
                <div className="filterItem">
                    <h2>Sort by</h2>
                    <div className="inputItem">
                        <input type="radio" name="price" id="asc" value="asc" onChange={(e=>setSort("asc"))}  />
                        <label htmlFor="asc">Price (Lowest first) </label>
                    </div>
                    <div className="inputItem">
                        <input type="radio" name="price" id="desc" value="asc" onChange={(e=>setSort("desc"))}  />
                        <label htmlFor="desc">Price (Highest first) </label>
                    </div>
                </div>
            </div>

            <div className="right">
                <img src='https://images.pexels.com/photos/1549200/pexels-photo-1549200.jpeg?auto=compress&cs=tinysrgb&w=1600' className='catImg' alt=''/>
                <List catId={catId} maxPrice={maxPrice} sort={sort} subCats={selectedSubCats} />
            </div>
        </div>
    )
}


export default Products