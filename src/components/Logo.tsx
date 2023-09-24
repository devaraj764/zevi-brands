import React from 'react'
import BrandLogo from '../assets/zevi-brand.png'

type Props = {}

const Logo = (props: Props) => {
  return (
    <img className="logo" alt="Zevi Logo" src={BrandLogo}/>
  )
}

export default Logo