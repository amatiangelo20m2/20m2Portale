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
 *//* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs';

import { FormDTO } from '../model/formDTO';
import { SpecialdayconfFormCodeBody } from '../model/specialdayconfFormCodeBody';
import { TimeRange } from '../model/timeRange';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable({providedIn: 'root'})
export class FormControllerService {

    protected basePath = 'http://localhost:8088/restaurantservice';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     *
     *
     * @param body
     * @param isClosed
     * @param descriptionSpecialDay
     * @param formCode
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public addSpecialDayConf(body: SpecialdayconfFormCodeBody, isClosed: boolean, descriptionSpecialDay: string, formCode: string, observe?: 'body', reportProgress?: boolean): Observable<FormDTO>;
    public addSpecialDayConf(body: SpecialdayconfFormCodeBody, isClosed: boolean, descriptionSpecialDay: string, formCode: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<FormDTO>>;
    public addSpecialDayConf(body: SpecialdayconfFormCodeBody, isClosed: boolean, descriptionSpecialDay: string, formCode: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<FormDTO>>;
    public addSpecialDayConf(body: SpecialdayconfFormCodeBody, isClosed: boolean, descriptionSpecialDay: string, formCode: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling addSpecialDayConf.');
        }

        if (isClosed === null || isClosed === undefined) {
            throw new Error('Required parameter isClosed was null or undefined when calling addSpecialDayConf.');
        }

        if (descriptionSpecialDay === null || descriptionSpecialDay === undefined) {
            throw new Error('Required parameter descriptionSpecialDay was null or undefined when calling addSpecialDayConf.');
        }

        if (formCode === null || formCode === undefined) {
            throw new Error('Required parameter formCode was null or undefined when calling addSpecialDayConf.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (isClosed !== undefined && isClosed !== null) {
            queryParameters = queryParameters.set('isClosed', <any>isClosed);
        }
        if (descriptionSpecialDay !== undefined && descriptionSpecialDay !== null) {
            queryParameters = queryParameters.set('descriptionSpecialDay', <any>descriptionSpecialDay);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<FormDTO>('put',`${this.basePath}/api/form/add/specialdayconf/${encodeURIComponent(String(formCode))}`,
            {
                body: body,
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     *
     *
     * @param body
     * @param formCode
     * @param dayOfWeek
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public addTimeRange(body: TimeRange, formCode: string, dayOfWeek: string, observe?: 'body', reportProgress?: boolean): Observable<FormDTO>;
    public addTimeRange(body: TimeRange, formCode: string, dayOfWeek: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<FormDTO>>;
    public addTimeRange(body: TimeRange, formCode: string, dayOfWeek: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<FormDTO>>;
    public addTimeRange(body: TimeRange, formCode: string, dayOfWeek: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling addTimeRange.');
        }

        if (formCode === null || formCode === undefined) {
            throw new Error('Required parameter formCode was null or undefined when calling addTimeRange.');
        }

        if (dayOfWeek === null || dayOfWeek === undefined) {
            throw new Error('Required parameter dayOfWeek was null or undefined when calling addTimeRange.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<FormDTO>('put',`${this.basePath}/api/form/add/timerange/${encodeURIComponent(String(formCode))}/${encodeURIComponent(String(dayOfWeek))}`,
            {
                body: body,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     *
     *
     * @param body
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createForm(body: FormDTO, observe?: 'body', reportProgress?: boolean): Observable<FormDTO>;
    public createForm(body: FormDTO, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<FormDTO>>;
    public createForm(body: FormDTO, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<FormDTO>>;
    public createForm(body: FormDTO, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling createForm.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<FormDTO>('post',`${this.basePath}/api/form/create`,
            {
                body: body,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     *
     *
     * @param formCode
     * @param timeRangeCode
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteOpeningHourConfById(formCode: string, timeRangeCode: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public deleteOpeningHourConfById(formCode: string, timeRangeCode: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public deleteOpeningHourConfById(formCode: string, timeRangeCode: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public deleteOpeningHourConfById(formCode: string, timeRangeCode: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (formCode === null || formCode === undefined) {
            throw new Error('Required parameter formCode was null or undefined when calling deleteOpeningHourConfById.');
        }

        if (timeRangeCode === null || timeRangeCode === undefined) {
            throw new Error('Required parameter timeRangeCode was null or undefined when calling deleteOpeningHourConfById.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<any>('delete',`${this.basePath}/api/form/delete/openinghourconf/${encodeURIComponent(String(formCode))}/${encodeURIComponent(String(timeRangeCode))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     *
     *
     * @param body
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public editForm(body: FormDTO, observe?: 'body', reportProgress?: boolean): Observable<FormDTO>;
    public editForm(body: FormDTO, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<FormDTO>>;
    public editForm(body: FormDTO, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<FormDTO>>;
    public editForm(body: FormDTO, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling editForm.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<FormDTO>('put',`${this.basePath}/api/form/editform`,
            {
                body: body,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     *
     *
     * @param formCode
     * @param dateFrom
     * @param dateTo
     * @param description
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public insertHolidays(formCode: string, dateFrom: Date, dateTo: Date, description: string, observe?: 'body', reportProgress?: boolean): Observable<FormDTO>;
    public insertHolidays(formCode: string, dateFrom: Date, dateTo: Date, description: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<FormDTO>>;
    public insertHolidays(formCode: string, dateFrom: Date, dateTo: Date, description: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<FormDTO>>;
    public insertHolidays(formCode: string, dateFrom: Date, dateTo: Date, description: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (formCode === null || formCode === undefined) {
            throw new Error('Required parameter formCode was null or undefined when calling insertHolidays.');
        }

        if (dateFrom === null || dateFrom === undefined) {
            throw new Error('Required parameter dateFrom was null or undefined when calling insertHolidays.');
        }

        if (dateTo === null || dateTo === undefined) {
            throw new Error('Required parameter dateTo was null or undefined when calling insertHolidays.');
        }

        if (description === null || description === undefined) {
            throw new Error('Required parameter description was null or undefined when calling insertHolidays.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (dateFrom !== undefined && dateFrom !== null) {
            queryParameters = queryParameters.set('dateFrom', <any>dateFrom.toISOString());
        }
        if (dateTo !== undefined && dateTo !== null) {
            queryParameters = queryParameters.set('dateTo', <any>dateTo.toISOString());
        }
        if (description !== undefined && description !== null) {
            queryParameters = queryParameters.set('description', <any>description);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<FormDTO>('put',`${this.basePath}/api/form/add/holidays/${encodeURIComponent(String(formCode))}`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     *
     *
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public retrieveAll(observe?: 'body', reportProgress?: boolean): Observable<Array<FormDTO>>;
    public retrieveAll(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<FormDTO>>>;
    public retrieveAll(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<FormDTO>>>;
    public retrieveAll(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<Array<FormDTO>>('get',`${this.basePath}/api/form/retrieveall`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     *
     *
     * @param branchCode
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public retrieveByBranchCode(branchCode: string, observe?: 'body', reportProgress?: boolean): Observable<Array<FormDTO>>;
    public retrieveByBranchCode(branchCode: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<FormDTO>>>;
    public retrieveByBranchCode(branchCode: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<FormDTO>>>;
    public retrieveByBranchCode(branchCode: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (branchCode === null || branchCode === undefined) {
            throw new Error('Required parameter branchCode was null or undefined when calling retrieveByBranchCode.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<Array<FormDTO>>('get',`${this.basePath}/api/form/retrievebybranchcode/${encodeURIComponent(String(branchCode))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     *
     *
     * @param formCode
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public retrieveByFormCode(formCode: string, observe?: 'body', reportProgress?: boolean): Observable<FormDTO>;
    public retrieveByFormCode(formCode: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<FormDTO>>;
    public retrieveByFormCode(formCode: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<FormDTO>>;
    public retrieveByFormCode(formCode: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (formCode === null || formCode === undefined) {
            throw new Error('Required parameter formCode was null or undefined when calling retrieveByFormCode.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<FormDTO>('get',`${this.basePath}/api/form/retrievebyformcode/${encodeURIComponent(String(formCode))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     *
     *
     * @param formCode
     * @param dayOfWeek
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public switchOpeningStatus(formCode: string, dayOfWeek: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public switchOpeningStatus(formCode: string, dayOfWeek: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public switchOpeningStatus(formCode: string, dayOfWeek: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public switchOpeningStatus(formCode: string, dayOfWeek: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (formCode === null || formCode === undefined) {
            throw new Error('Required parameter formCode was null or undefined when calling switchOpeningStatus.');
        }

        if (dayOfWeek === null || dayOfWeek === undefined) {
            throw new Error('Required parameter dayOfWeek was null or undefined when calling switchOpeningStatus.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<any>('put',`${this.basePath}/api/form/switchOpeningStatus/${encodeURIComponent(String(formCode))}/${encodeURIComponent(String(dayOfWeek))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
