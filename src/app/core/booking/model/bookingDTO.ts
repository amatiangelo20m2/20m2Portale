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
import { Customer } from './customer';
import { LocalTime } from './localTime';

export interface BookingDTO {
    bookingId?: number;
    branchCode?: string;
    bookingCode?: string;
    date?: string;
    time?: LocalTime;
    guest?: number;
    child?: number;
    allowedDogs?: number;
    requests?: string;
    formCodeFrom?: string;
    insertBookingTime?: Date;
    customer?: Customer;
}
