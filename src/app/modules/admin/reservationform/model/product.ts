/**
 * Api Documentation
 * Api Documentation
 *
 * OpenAPI spec version: 1.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */


export interface Product { 
    available?: boolean;
    category?: Product.CategoryEnum;
    ingredients?: string;
    name?: string;
    price?: number;
    productId?: number;
    subCategory?: string;
}
export namespace Product {
    export type CategoryEnum = 'ANTIPASTI' | 'PRIMI' | 'SECONDI' | 'CONTORNI' | 'DOLCI' | 'BEVANDE';
    export const CategoryEnum = {
        ANTIPASTI: 'ANTIPASTI' as CategoryEnum,
        PRIMI: 'PRIMI' as CategoryEnum,
        SECONDI: 'SECONDI' as CategoryEnum,
        CONTORNI: 'CONTORNI' as CategoryEnum,
        DOLCI: 'DOLCI' as CategoryEnum,
        BEVANDE: 'BEVANDE' as CategoryEnum
    };
}