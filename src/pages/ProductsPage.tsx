import React from 'react'
import SearchBox from '../components/SearchBox'
import Filters, { CollapsibleFilters } from '../components/Filters'
import Logo from '../assets/zevi-brand.png'
import ProductsGrid from '../components/ProductsGrid'
import { useProductsContext } from '../contexts/ProductContext'
import { ProductType } from '../interfaces'
import { FilterProducts } from '../helpers/FakeData';
import { useNavigate } from 'react-router-dom'

type FiltersType = {
  brands: string[]
  pricing: number[][]
  ratings: number[]
};

const ProductsPage: React.FC = () => {
  const [searchKey, setSearchKey] = React.useState<string>('');
  const navigate = useNavigate();
  const context = useProductsContext();
  const [products, setProducts] = React.useState<ProductType[]>(context?.data);
  const [filters, setFilters] = React.useState<FiltersType>({ brands: [], ratings: [], pricing: [] })

  React.useEffect(() => {
    const results = FilterProducts({ ...filters, data: context?.data, search: searchKey });
    setProducts(results);

  }, [filters, searchKey, context?.data]);

  const brandsAction = ({ data, remove }: { data: string, remove: boolean }) => {
    var filtered = filters.brands;
    if (remove) {
      filtered = filtered.filter(brand => brand.toLowerCase() !== data.toLowerCase())
    } else {
      filtered = [...filtered, data]
    }
    setFilters(filters => ({ ...filters, brands: filtered }))
  }

  const pricingAction = ({ data, remove }: { data: number[], remove: boolean }) => {
    var filtered = filters.pricing;
    if (remove) {
      filtered = filtered.filter(pricing => (pricing[0] + pricing[1]) !== (data[0] + data[1]))
    } else {
      filtered = [...filtered, data]
    }
    setFilters(filters => ({ ...filters, pricing: filtered }))
  }

  const ratingsAction = ({ data, remove }: { data: number, remove: boolean }) => {
    var filtered = filters.ratings;
    if (remove) {
      filtered = filtered.filter(rating => rating !== data)
    } else {
      filtered = [...filtered, data]
    }
    setFilters(filters => ({ ...filters, ratings: filtered }))
  }

  return (
    <div className="ProductsPage">
      <div className="filters">
        <Filters actions={{ brandsAction, pricingAction, ratingsAction }} />
      </div>
      <div className="products-listing">
        <div className="flex-space-between" style={{ marginTop: '20px' }}>
          <SearchBox styles={{ border: '1px solid #ccc', padding: '0px auto' }} text={searchKey} setText={setSearchKey} />
          <img onClick={() => navigate('/')} src={Logo} alt="Zevi Brands" className="brand-logo" />
        </div>
        <CollapsibleFilters actions={{ brandsAction, pricingAction, ratingsAction }} />
        <ProductsGrid data={products} />
      </div>
    </div>
  )
}

export default ProductsPage