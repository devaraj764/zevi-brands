import React, { memo } from 'react'
import { useProductsContext } from '../contexts/ProductContext'
import { ProductType } from '../interfaces'
import getRandomElementsFromArray from '../helpers/getRandomElements'
import { Link, useNavigate } from 'react-router-dom'

type Props = {
    searchKey: string
}

const TrendsBox: React.FC<Props> = ({ searchKey }) => {
    const context = useProductsContext()
    const trends = getRandomElementsFromArray(context?.data, 5);
    const popularSearches = getRandomElementsFromArray(context?.data, 5);
    const [searches, setSearches] = React.useState<ProductType[]>([]);

    const filterProducts: (key: string) => ProductType[] = (key: string) => {
        const products = context?.data;
        return products.filter((product: ProductType) =>
            product.productName.toLowerCase().includes(key.toLowerCase())
        );;
    }

    React.useEffect(() => {
        let timeoutId: any;

        if (searchKey) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                const data = filterProducts(searchKey);
                setSearches(data);
            }, 500);
        } else {
            setSearches([]);
        }
        return () => clearTimeout(timeoutId);

        // eslint-disable-next-line
    }, [searchKey])

    const navigate = useNavigate();

    return (
        searchKey === '' ?
            <div className='trends-box'>
                <div className="flex-space-between">
                    <h3>Latest Trends</h3>
                    <Link style={{textDecoration:'none'}} to='/products'>View Products</Link>
                </div>
                <div className='trends-grid'>
                    {
                        trends.map((product: ProductType, index: number) => (
                            <TrendsCard key={index} product={product} />
                        ))
                    }
                </div>
                <br />
                <h3>Popular suggestions</h3>
                <br />
                {
                    popularSearches?.map((product, index) =>
                        <p key={index} onClick={() => navigate(`/products?search=${product.productName.toLowerCase().replaceAll(' ', '-')}`)} className='popular-search'>{product.productName}</p>)
                }
            </div>
            :
            <div className="trends-box">
                <div className='trends-grid'>
                    {
                        searches.length <= 0 ? 'Nor Results Found!' : searches.map((product: ProductType, index: number) => (
                            <TrendsCard product={product} key={index} />
                        ))
                    }
                </div>
            </div>
    )
}

const TrendsCard: React.FC<{ product: ProductType }> = ({ product }) => {
    const navigate = useNavigate();
    return (
        <div className="product-card" onClick={() => navigate(`/products?search=${product.productName.toLowerCase().replaceAll(' ', '-')}`)}>
            <img src={product.productImage} alt={product.productName} className="product-image" />
            <p className="product-title">{product.productName}</p>
        </div>
    )
}

export default memo(TrendsBox)