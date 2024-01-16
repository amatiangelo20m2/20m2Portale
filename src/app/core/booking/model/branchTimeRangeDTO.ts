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
import { TimeRange } from './timeRange';

export interface BranchTimeRangeDTO { 
    id?: number;
    dayOfWeek?: BranchTimeRangeDTO.DayOfWeekEnum;
    timeRanges?: Array<TimeRange>;
    particularDate?: string;
    closed?: boolean;
}
export namespace BranchTimeRangeDTO {
    export type DayOfWeekEnum = 'LUNEDI' | 'MARTEDI' | 'MERCOLEDI' | 'GIOVEDI' | 'VENERDI' | 'SABATO' | 'DOMENICA' | 'FESTIVO';
    export const DayOfWeekEnum = {
        LUNEDI: 'LUNEDI' as DayOfWeekEnum,
        MARTEDI: 'MARTEDI' as DayOfWeekEnum,
        MERCOLEDI: 'MERCOLEDI' as DayOfWeekEnum,
        GIOVEDI: 'GIOVEDI' as DayOfWeekEnum,
        VENERDI: 'VENERDI' as DayOfWeekEnum,
        SABATO: 'SABATO' as DayOfWeekEnum,
        DOMENICA: 'DOMENICA' as DayOfWeekEnum,
        FESTIVO: 'FESTIVO' as DayOfWeekEnum
    };
}