import React from 'react'
import Collapsible from './Collapsible'
import { BrandsList, PriceRanges } from '../helpers/FakeData'
import Stars from './Stars'

type Props = {
  actions: any
}

const Filters: React.FC<Props> = ({ actions }: Props) => {
  return (
    <div style={{ padding: '1em' }}>
      <h1>Search Filters</h1>
      <br />
      <BrandFilters action={actions.brandsAction} />
      <PriceFilters action={actions.pricingAction} />
      <RatingFilters action={actions.ratingsAction} />
    </div>
  )
}

export const CollapsibleFilters: React.FC<Props> = ({ actions }: Props) => {
  return (
    <div className="collapsible-filters">
      <Collapsible title="Search Filters" collapsed={true}>
        <BrandFilters action={actions.brandsAction} />
        <PriceFilters action={actions.pricingAction} />
        <RatingFilters action={actions.ratingsAction} />
      </Collapsible>
    </div>
  )
}

const FilterCard: React.FC<{ label: string | React.ReactNode, action: any, value: string | number | number[] }> = ({ label, action, value }) => {
  const [isChecked, setIsChecked] = React.useState<boolean>(false);
  const handleChange = () => {
    if (isChecked) action({ data: value, remove: true })
    else action({ data: value, remove: false })
    setIsChecked(!isChecked);
  }
  return (
    <div className="filter-card">
      <label>
        <input checked={isChecked} type="checkbox" onChange={handleChange} />&nbsp;{label}
      </label>
    </div>
  )
}

const PriceFilters: React.FC<{ action: (args: { data: number[], remove: boolean }) => void }> = ({ action }) => {
  const prices = PriceRanges;
  return (
    <Collapsible title="Pricing" collapsed={false}>
      {
        prices.map((range, index) => (
          <FilterCard key={index} label={`${range[0]} - ${range[1]}`} action={action} value={range} />
        ))
      }
    </Collapsible >
  )
}

const RatingFilters: React.FC<{ action: (args: { data: number, remove: boolean }) => void }> = ({ action }) => {
  const ratings = [5, 4, 3, 2, 1];
  return (
    <Collapsible title="Ratings" collapsed={false}>
      {
        ratings.map((rating, index) => (
          <FilterCard key={index} label={<Stars stars={rating} />} value={rating} action={action} />
        ))
      }
    </Collapsible >
  )
}

const BrandFilters: React.FC<{ action: (args: { data: string, remove: boolean }) => void }> = ({ action }) => {
  const brands = BrandsList;
  return (
    <Collapsible title="Brands" collapsed={false}>
      {
        brands.map((brand, index) => (
          <FilterCard key={index} label={brand} action={action} value={brand} />
        ))
      }
    </Collapsible >
  )
}

export default Filters