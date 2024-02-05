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

import { BranchCreationEntity } from '../model/branchCreationEntity';
import { BranchResponseEntity } from '../model/branchResponseEntity';
import { DashboardData } from '../model/dashboardData';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable({providedIn: 'root'})
export class DashboardControllerService {

    protected basePath = 'http://localhost:8088/ventimetridashboard';
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
    public getBranchData(branchCode: string, observe?: 'body', reportProgress?: boolean): Observable<BranchResponseEntity>;
    public getBranchData(branchCode: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<BranchResponseEntity>>;
    public getBranchData(branchCode: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<BranchResponseEntity>>;
    public getBranchData(branchCode: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (branchCode === null || branchCode === undefined) {
            throw new Error('Required parameter branchCode was null or undefined when calling getBranchData.');
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

        return this.httpClient.request<BranchResponseEntity>('get',`${this.basePath}/api/dashboard/getbranchdata`,
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
     * @param userCode
     * @param branchCode
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getbranch(userCode: string, branchCode: string, observe?: 'body', reportProgress?: boolean): Observable<BranchResponseEntity>;
    public getbranch(userCode: string, branchCode: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<BranchResponseEntity>>;
    public getbranch(userCode: string, branchCode: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<BranchResponseEntity>>;
    public getbranch(userCode: string, branchCode: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (userCode === null || userCode === undefined) {
            throw new Error('Required parameter userCode was null or undefined when calling getbranch.');
        }

        if (branchCode === null || branchCode === undefined) {
            throw new Error('Required parameter branchCode was null or undefined when calling getbranch.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (userCode !== undefined && userCode !== null) {
            queryParameters = queryParameters.set('userCode', <any>userCode);
        }
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

        return this.httpClient.request<BranchResponseEntity>('get',`${this.basePath}/api/dashboard/branch`,
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
     * @param userCode
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public retrieveDashboardData(userCode: string, observe?: 'body', reportProgress?: boolean): Observable<DashboardData>;
    public retrieveDashboardData(userCode: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<DashboardData>>;
    public retrieveDashboardData(userCode: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<DashboardData>>;
    public retrieveDashboardData(userCode: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (userCode === null || userCode === undefined) {
            throw new Error('Required parameter userCode was null or undefined when calling retrieveDashboardData.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (userCode !== undefined && userCode !== null) {
            queryParameters = queryParameters.set('userCode', <any>userCode);
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

        return this.httpClient.request<DashboardData>('get',`${this.basePath}/api/dashboard/retrievedata`,
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
    public save(body: BranchCreationEntity, observe?: 'body', reportProgress?: boolean): Observable<BranchResponseEntity>;
    public save(body: BranchCreationEntity, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<BranchResponseEntity>>;
    public save(body: BranchCreationEntity, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<BranchResponseEntity>>;
    public save(body: BranchCreationEntity, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling save.');
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

        return this.httpClient.request<BranchResponseEntity>('post',`${this.basePath}/api/dashboard/branch/save`,
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
