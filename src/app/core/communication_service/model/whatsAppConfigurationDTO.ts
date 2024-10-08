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

export interface WhatsAppConfigurationDTO { 
    id?: number;
    branchCode?: string;
    phone?: string;
    waApiInstanceId?: string;
    waApiState?: WhatsAppConfigurationDTO.WaApiStateEnum;
    lastError?: string;
    creationDate?: Date;
    qrCode?: string;
    photoUrl?: string;
    displayName?: string;
}
export namespace WhatsAppConfigurationDTO {
    export type WaApiStateEnum = 'NEW' | 'INSTANCE_CREATED' | 'READY' | 'NOT_READY';
    export const WaApiStateEnum = {
        NEW: 'NEW' as WaApiStateEnum,
        INSTANCECREATED: 'INSTANCE_CREATED' as WaApiStateEnum,
        READY: 'READY' as WaApiStateEnum,
        NOTREADY: 'NOT_READY' as WaApiStateEnum
    };
}