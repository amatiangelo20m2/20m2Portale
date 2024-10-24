/**
 * OpenAPI definition
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: v0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { ProductDTO } from './productDTO';

export interface SupplierDTO { 
    supplierId?: number;
    name?: string;
    vatNumber?: string;
    address?: string;
    city?: string;
    cap?: string;
    cf?: string;
    phoneNumber?: string;
    email?: string;
    pec?: string;
    supplierCode?: string;
    country?: string;
    productDTOList?: Array<ProductDTO>;
    createdByUserCode?: string;
    branchNotAllowed?: Array<string>;
}