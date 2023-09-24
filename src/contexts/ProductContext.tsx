// MyContext.js
import React, { createContext, useContext, useMemo } from 'react';
import { ProductType } from '../interfaces';
import { generateFakeData } from '../helpers/FakeData';

// Create a context
const MyContext = createContext<any>({});

interface Props {
    children?: any
}

export function ProductsProvider(props: Props) {

    const data = useMemo<ProductType[]>(() => generateFakeData(50), []);

    // const myData : {data: ProductType[]} = {
    //     data
    // }

    return (
        <MyContext.Provider value={{ data }}>
            {props?.children}
        </MyContext.Provider>
    );
}

// A custom hook to use the context
export function useProductsContext() {
    return useContext(MyContext);
}
