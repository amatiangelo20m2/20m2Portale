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

export interface Customer { 
    customerId?: number;
    name?: string;
    lastname?: string;
    email?: string;
    prefix?: string;
    phone?: string;
    dob?: string;
    registrationDate?: Date;
    treatmentPersonalData?: boolean;
    branchCode?: string;
    numberVerified?: boolean;
}