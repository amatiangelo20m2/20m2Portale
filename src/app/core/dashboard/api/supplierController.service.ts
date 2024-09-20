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

import { ProductDTO } from '../model/productDTO';
import { SupplierDTO } from '../model/supplierDTO';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable({providedIn: 'root'})
export class SupplierControllerService {

    protected basePath = 'http://localhost:8088/ventimetriservice';
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
     * @param branchCode
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public addSupplier(body: SupplierDTO, branchCode: string, observe?: 'body', reportProgress?: boolean): Observable<SupplierDTO>;
    public addSupplier(body: SupplierDTO, branchCode: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<SupplierDTO>>;
    public addSupplier(body: SupplierDTO, branchCode: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<SupplierDTO>>;
    public addSupplier(body: SupplierDTO, branchCode: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling addSupplier.');
        }

        if (branchCode === null || branchCode === undefined) {
            throw new Error('Required parameter branchCode was null or undefined when calling addSupplier.');
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
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<SupplierDTO>('post',`${this.basePath}/api/supplier/add`,
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
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public editSupplier(body: SupplierDTO, observe?: 'body', reportProgress?: boolean): Observable<SupplierDTO>;
    public editSupplier(body: SupplierDTO, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<SupplierDTO>>;
    public editSupplier(body: SupplierDTO, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<SupplierDTO>>;
    public editSupplier(body: SupplierDTO, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling editSupplier.');
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

        return this.httpClient.request<SupplierDTO>('put',`${this.basePath}/api/supplier/editsupplier`,
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
     * @param supplierId
     * @param storageId
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public insertProduct(body: ProductDTO, supplierId: number, storageId: number, observe?: 'body', reportProgress?: boolean): Observable<ProductDTO>;
    public insertProduct(body: ProductDTO, supplierId: number, storageId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ProductDTO>>;
    public insertProduct(body: ProductDTO, supplierId: number, storageId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ProductDTO>>;
    public insertProduct(body: ProductDTO, supplierId: number, storageId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling insertProduct.');
        }

        if (supplierId === null || supplierId === undefined) {
            throw new Error('Required parameter supplierId was null or undefined when calling insertProduct.');
        }

        if (storageId === null || storageId === undefined) {
            throw new Error('Required parameter storageId was null or undefined when calling insertProduct.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (supplierId !== undefined && supplierId !== null) {
            queryParameters = queryParameters.set('supplierId', <any>supplierId);
        }
        if (storageId !== undefined && storageId !== null) {
            queryParameters = queryParameters.set('storageId', <any>storageId);
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

        return this.httpClient.request<ProductDTO>('post',`${this.basePath}/api/supplier/product/add`,
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
     * @param supplierId
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public insertProductList(body: Array<ProductDTO>, supplierId: number, observe?: 'body', reportProgress?: boolean): Observable<Array<ProductDTO>>;
    public insertProductList(body: Array<ProductDTO>, supplierId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<ProductDTO>>>;
    public insertProductList(body: Array<ProductDTO>, supplierId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<ProductDTO>>>;
    public insertProductList(body: Array<ProductDTO>, supplierId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling insertProductList.');
        }

        if (supplierId === null || supplierId === undefined) {
            throw new Error('Required parameter supplierId was null or undefined when calling insertProductList.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (supplierId !== undefined && supplierId !== null) {
            queryParameters = queryParameters.set('supplierId', <any>supplierId);
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

        return this.httpClient.request<Array<ProductDTO>>('post',`${this.basePath}/api/supplier/product/insertlist`,
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
     * @param branchCode
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public insertSupplierList(body: Array<SupplierDTO>, branchCode: string, observe?: 'body', reportProgress?: boolean): Observable<Array<SupplierDTO>>;
    public insertSupplierList(body: Array<SupplierDTO>, branchCode: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<SupplierDTO>>>;
    public insertSupplierList(body: Array<SupplierDTO>, branchCode: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<SupplierDTO>>>;
    public insertSupplierList(body: Array<SupplierDTO>, branchCode: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling insertSupplierList.');
        }

        if (branchCode === null || branchCode === undefined) {
            throw new Error('Required parameter branchCode was null or undefined when calling insertSupplierList.');
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
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<Array<SupplierDTO>>('post',`${this.basePath}/api/supplier/addlist`,
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
     * @param supplierId
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public removeSupplier(supplierId: number, observe?: 'body', reportProgress?: boolean): Observable<boolean>;
    public removeSupplier(supplierId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<boolean>>;
    public removeSupplier(supplierId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<boolean>>;
    public removeSupplier(supplierId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (supplierId === null || supplierId === undefined) {
            throw new Error('Required parameter supplierId was null or undefined when calling removeSupplier.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (supplierId !== undefined && supplierId !== null) {
            queryParameters = queryParameters.set('supplierId', <any>supplierId);
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

        return this.httpClient.request<boolean>('delete',`${this.basePath}/api/supplier/delete`,
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
    public retrieveAllSupplier(observe?: 'body', reportProgress?: boolean): Observable<Array<SupplierDTO>>;
    public retrieveAllSupplier(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<SupplierDTO>>>;
    public retrieveAllSupplier(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<SupplierDTO>>>;
    public retrieveAllSupplier(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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

        return this.httpClient.request<Array<SupplierDTO>>('get',`${this.basePath}/api/supplier/retrieveSuppliers`,
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
     * @param supplierId
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public storeNewBranchExclusionListToSupplier(body: Array<string>, supplierId: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public storeNewBranchExclusionListToSupplier(body: Array<string>, supplierId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public storeNewBranchExclusionListToSupplier(body: Array<string>, supplierId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public storeNewBranchExclusionListToSupplier(body: Array<string>, supplierId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling storeNewBranchExclusionListToSupplier.');
        }

        if (supplierId === null || supplierId === undefined) {
            throw new Error('Required parameter supplierId was null or undefined when calling storeNewBranchExclusionListToSupplier.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (supplierId !== undefined && supplierId !== null) {
            queryParameters = queryParameters.set('supplierId', <any>supplierId);
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

        return this.httpClient.request<any>('put',`${this.basePath}/api/supplier/storenewbranchexclusionlisttotupplier`,
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
     * @param supplierId
     * @param productId
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public storeNewBranchListNotAllowedToSeeProduct(body: Array<string>, supplierId: number, productId: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public storeNewBranchListNotAllowedToSeeProduct(body: Array<string>, supplierId: number, productId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public storeNewBranchListNotAllowedToSeeProduct(body: Array<string>, supplierId: number, productId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public storeNewBranchListNotAllowedToSeeProduct(body: Array<string>, supplierId: number, productId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling storeNewBranchListNotAllowedToSeeProduct.');
        }

        if (supplierId === null || supplierId === undefined) {
            throw new Error('Required parameter supplierId was null or undefined when calling storeNewBranchListNotAllowedToSeeProduct.');
        }

        if (productId === null || productId === undefined) {
            throw new Error('Required parameter productId was null or undefined when calling storeNewBranchListNotAllowedToSeeProduct.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (supplierId !== undefined && supplierId !== null) {
            queryParameters = queryParameters.set('supplierId', <any>supplierId);
        }
        if (productId !== undefined && productId !== null) {
            queryParameters = queryParameters.set('productId', <any>productId);
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

        return this.httpClient.request<any>('put',`${this.basePath}/api/supplier/storenewbranchListNotAllowedToSeeProduct`,
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
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateProduct(body: ProductDTO, observe?: 'body', reportProgress?: boolean): Observable<ProductDTO>;
    public updateProduct(body: ProductDTO, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ProductDTO>>;
    public updateProduct(body: ProductDTO, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ProductDTO>>;
    public updateProduct(body: ProductDTO, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling updateProduct.');
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

        return this.httpClient.request<ProductDTO>('put',`${this.basePath}/api/supplier/product/update`,
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
