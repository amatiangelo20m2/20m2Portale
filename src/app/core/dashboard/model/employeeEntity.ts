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

export interface EmployeeEntity { 
    name?: string;
    phone?: string;
    email?: string;
    avatar?: string;
    status?: EmployeeEntity.StatusEnum;
    userCode?: string;
    fcmToken?: string;
    branchCode?: string;
    branchName?: string;
    role?: EmployeeEntity.RoleEnum;
    authorized?: boolean;
}
export namespace EmployeeEntity {
    export type StatusEnum = 'ONLINE' | 'AWAY' | 'BUSY' | 'INVISIBLE';
    export const StatusEnum = {
        ONLINE: 'ONLINE' as StatusEnum,
        AWAY: 'AWAY' as StatusEnum,
        BUSY: 'BUSY' as StatusEnum,
        INVISIBLE: 'INVISIBLE' as StatusEnum
    };
    export type RoleEnum = 'AMMINISTRATORE' | 'RESPONSABILE' | 'FACTOTUM' | 'RESPONSABILE_MAGAZZINO' | 'BARMAN' | 'CUOCO' | 'CAMERIERE';
    export const RoleEnum = {
        AMMINISTRATORE: 'AMMINISTRATORE' as RoleEnum,
        RESPONSABILE: 'RESPONSABILE' as RoleEnum,
        FACTOTUM: 'FACTOTUM' as RoleEnum,
        RESPONSABILEMAGAZZINO: 'RESPONSABILE_MAGAZZINO' as RoleEnum,
        BARMAN: 'BARMAN' as RoleEnum,
        CUOCO: 'CUOCO' as RoleEnum,
        CAMERIERE: 'CAMERIERE' as RoleEnum
    };
}