export interface ProductType {
    productImage: string;
    productName: string;
    productPrice: GLfloat;
    productOriginalPrice: GLfloat;
    productBrand: string;
    productRating: number;
    numberOfRatings: number;
    isLiked?: boolean;
}

export interface FilterProps {
    search?: string
    brands?: string[]
    pricing?: number[][]
    ratings?: number[]
    data: ProductType[]
}