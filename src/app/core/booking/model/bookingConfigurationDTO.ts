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
import { BranchTimeRangeDTO } from './branchTimeRangeDTO';
import { WaApiConfigDTO } from './waApiConfigDTO';

export interface BookingConfigurationDTO {
    branchCode?: string;
    guests?: number;
    allowOverbooking?: boolean;
    waApiConfigDTO?: WaApiConfigDTO;
    branchTimeRanges?: Array<BranchTimeRangeDTO>;
}
