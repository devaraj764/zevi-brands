import React from 'react'
import { ProductType } from '../interfaces';
import Stars from './Stars';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

type Props = {
    data: ProductType[]
}

const ProductsGrid: React.FC<Props> = ({ data }) => {
    return (
        <>
            {/* <p>{data.length}</p> */}
            <div className='products-grid'>
                {
                    data.length > 0 ? data.map((product, index) => (
                        <div className="product-grid"  key={index}>

                            <div className="product-card">
                                <div className="product-banner">
                                    <div className="like-status">
                                        <LikedComponent />
                                    </div>
                                    <div className="view-product">View Product</div>
                                    <img src={product.productImage} alt={product.productName} className="product-image" />
                                </div>
                                <p className="product-title">{product.productName}</p>
                                <div className="flex">
                                    <p className="original-price">Rs.{product.productOriginalPrice}</p>
                                    <p className="product-price">Rs.{product.productPrice}</p>
                                </div>
                                <div className="flex" style={{ marginTop: '10px' }}>
                                    <Stars stars={product.productRating} />
                                    ({product.numberOfRatings})
                                </div>
                            </div>
                        </div>
                    )) : <h3 style={{ textAlign: 'center' }}>😿 No Results Found</h3>
                }
            </div>
        </>
    )
}

const LikedComponent: React.FC = () => {
    const [isLiked, setIsLiked] = React.useState<boolean>(false)

    return (
        isLiked ?
            <AiFillHeart size={32} style={{ cursor: 'pointer', color: '#D32424' }} onClick={() => setIsLiked(false)} />
            : <AiOutlineHeart size={32} style={{ cursor: 'pointer', color: '#fff' }} onClick={() => setIsLiked(true)} />
    )
}

export default ProductsGrid