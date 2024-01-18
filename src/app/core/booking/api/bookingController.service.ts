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

import { BranchConfigurationDTO } from '../model/branchConfigurationDTO';
import { BranchOpeningEditConfigurationRequest } from '../model/branchOpeningEditConfigurationRequest';
import { UpdateBranchConfigurationRequest } from '../model/updateBranchConfigurationRequest';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';



@Injectable({providedIn: 'root'})
export class BookingControllerService {

    protected basePath = 'http://localhost:8088/ventimetribooking';
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
     * @param branchCode
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public checkWaApiStatus(branchCode: string, observe?: 'body', reportProgress?: boolean): Observable<BranchConfigurationDTO>;
    public checkWaApiStatus(branchCode: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<BranchConfigurationDTO>>;
    public checkWaApiStatus(branchCode: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<BranchConfigurationDTO>>;
    public checkWaApiStatus(branchCode: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (branchCode === null || branchCode === undefined) {
            throw new Error('Required parameter branchCode was null or undefined when calling checkWaApiStatus.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (branchCode !== undefined && branchCode !== null) {
            queryParameters = queryParameters.set('branchCode', <any>branchCode);
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

        return this.httpClient.request<BranchConfigurationDTO>('get',`${this.basePath}/booking/configuration/waapi/instance/checkstatus`,
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
     * @param branchCode
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public configureNumberForWhatsAppMessaging(branchCode: string, observe?: 'body', reportProgress?: boolean): Observable<BranchConfigurationDTO>;
    public configureNumberForWhatsAppMessaging(branchCode: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<BranchConfigurationDTO>>;
    public configureNumberForWhatsAppMessaging(branchCode: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<BranchConfigurationDTO>>;
    public configureNumberForWhatsAppMessaging(branchCode: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (branchCode === null || branchCode === undefined) {
            throw new Error('Required parameter branchCode was null or undefined when calling configureNumberForWhatsAppMessaging.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (branchCode !== undefined && branchCode !== null) {
            queryParameters = queryParameters.set('branchCode', <any>branchCode);
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

        return this.httpClient.request<BranchConfigurationDTO>('get',`${this.basePath}/booking/configuration/waapi/instance/configure`,
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
     * @param timeRangeId
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteTimeRange(timeRangeId: number, observe?: 'body', reportProgress?: boolean): Observable<BranchConfigurationDTO>;
    public deleteTimeRange(timeRangeId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<BranchConfigurationDTO>>;
    public deleteTimeRange(timeRangeId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<BranchConfigurationDTO>>;
    public deleteTimeRange(timeRangeId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (timeRangeId === null || timeRangeId === undefined) {
            throw new Error('Required parameter timeRangeId was null or undefined when calling deleteTimeRange.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (timeRangeId !== undefined && timeRangeId !== null) {
            queryParameters = queryParameters.set('timeRangeId', <any>timeRangeId);
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

        return this.httpClient.request<BranchConfigurationDTO>('delete',`${this.basePath}/booking/deletetimerange`,
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
     * @param branchCode
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public reboot(branchCode: string, observe?: 'body', reportProgress?: boolean): Observable<BranchConfigurationDTO>;
    public reboot(branchCode: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<BranchConfigurationDTO>>;
    public reboot(branchCode: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<BranchConfigurationDTO>>;
    public reboot(branchCode: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (branchCode === null || branchCode === undefined) {
            throw new Error('Required parameter branchCode was null or undefined when calling reboot.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (branchCode !== undefined && branchCode !== null) {
            queryParameters = queryParameters.set('branchCode', <any>branchCode);
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

        return this.httpClient.request<BranchConfigurationDTO>('get',`${this.basePath}/booking/configuration/waapi/instance/reboot`,
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
     * @param body
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateConfiguration(body: BranchOpeningEditConfigurationRequest, observe?: 'body', reportProgress?: boolean): Observable<BranchConfigurationDTO>;
    public updateConfiguration(body: BranchOpeningEditConfigurationRequest, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<BranchConfigurationDTO>>;
    public updateConfiguration(body: BranchOpeningEditConfigurationRequest, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<BranchConfigurationDTO>>;
    public updateConfiguration(body: BranchOpeningEditConfigurationRequest, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling updateConfiguration.');
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

        return this.httpClient.request<BranchConfigurationDTO>('post',`${this.basePath}/booking/updateconfiguration`,
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
    public updateTimeRange(body: UpdateBranchConfigurationRequest, observe?: 'body', reportProgress?: boolean): Observable<BranchConfigurationDTO>;
    public updateTimeRange(body: UpdateBranchConfigurationRequest, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<BranchConfigurationDTO>>;
    public updateTimeRange(body: UpdateBranchConfigurationRequest, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<BranchConfigurationDTO>>;
    public updateTimeRange(body: UpdateBranchConfigurationRequest, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling updateTimeRange.');
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

        return this.httpClient.request<BranchConfigurationDTO>('post',`${this.basePath}/booking/configuration/timerange/update`,
            {
                body: body,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
