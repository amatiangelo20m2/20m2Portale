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
import { DateTimeRangeAvailableGuests } from './dateTimeRangeAvailableGuests';

export interface CustomerFormData { 
    branchCode?: string;
    formCode?: string;
    formLogo?: string;
    bookingSlotInMinutes?: number;
    maxTableNumber?: number;
    address?: string;
    dateTimeRangeAvailableGuests?: Array<DateTimeRangeAvailableGuests>;
}