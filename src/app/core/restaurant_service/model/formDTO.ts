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

export interface FormDTO { 
    formId?: number;
    formCode?: string;
    formName?: string;
    redirectPage?: string;
    creationDate?: Date;
    branchCode?: string;
    branchName?: string;
    branchAddress?: string;
    formStatus?: FormDTO.FormStatusEnum;
    tag?: Array<string>;
    formType?: FormDTO.FormTypeEnum;
}
export namespace FormDTO {
    export type FormStatusEnum = 'ATTIVO' | 'SOSPESO' | 'CANCELLATO';
    export const FormStatusEnum = {
        ATTIVO: 'ATTIVO' as FormStatusEnum,
        SOSPESO: 'SOSPESO' as FormStatusEnum,
        CANCELLATO: 'CANCELLATO' as FormStatusEnum
    };
    export type FormTypeEnum = 'PRENOTAZIONE' | 'RACCOLTA_DATI';
    export const FormTypeEnum = {
        PRENOTAZIONE: 'PRENOTAZIONE' as FormTypeEnum,
        RACCOLTADATI: 'RACCOLTA_DATI' as FormTypeEnum
    };
}