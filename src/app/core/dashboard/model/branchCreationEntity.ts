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

export interface BranchCreationEntity { 
    branchCode?: string;
    userCode?: string;
    name?: string;
    email?: string;
    address?: string;
    city?: string;
    cap?: string;
    phoneNumber?: string;
    vat?: string;
    type?: BranchCreationEntity.TypeEnum;
    logoImage?: Array<string>;
    fcmToken?: string;
}
export namespace BranchCreationEntity {
    export type TypeEnum = 'RISTORANTE' | 'FORNITORE' | 'CATERING';
    export const TypeEnum = {
        RISTORANTE: 'RISTORANTE' as TypeEnum,
        FORNITORE: 'FORNITORE' as TypeEnum,
        CATERING: 'CATERING' as TypeEnum
    };
}