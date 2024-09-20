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

import { CreateOrderEntity } from '../model/createOrderEntity';
import { OrderDTO } from '../model/orderDTO';
import { OrderItemDto } from '../model/orderItemDto';
import { OrderResultRecap } from '../model/orderResultRecap';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable({providedIn: 'root'})
export class OrderControllerService {

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
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createOrder(body: CreateOrderEntity, observe?: 'body', reportProgress?: boolean): Observable<OrderDTO>;
    public createOrder(body: CreateOrderEntity, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<OrderDTO>>;
    public createOrder(body: CreateOrderEntity, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<OrderDTO>>;
    public createOrder(body: CreateOrderEntity, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling createOrder.');
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

        return this.httpClient.request<OrderDTO>('post',`${this.basePath}/api/order/create`,
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
     * @param orderId
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteOrder(orderId: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public deleteOrder(orderId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public deleteOrder(orderId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public deleteOrder(orderId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (orderId === null || orderId === undefined) {
            throw new Error('Required parameter orderId was null or undefined when calling deleteOrder.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (orderId !== undefined && orderId !== null) {
            queryParameters = queryParameters.set('orderId', <any>orderId);
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

        return this.httpClient.request<any>('delete',`${this.basePath}/api/order/deleteorder`,
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
     * @param orderId
     * @param productIdList
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteOrderItemFromOrder(orderId: number, productIdList: Array<number>, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public deleteOrderItemFromOrder(orderId: number, productIdList: Array<number>, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public deleteOrderItemFromOrder(orderId: number, productIdList: Array<number>, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public deleteOrderItemFromOrder(orderId: number, productIdList: Array<number>, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (orderId === null || orderId === undefined) {
            throw new Error('Required parameter orderId was null or undefined when calling deleteOrderItemFromOrder.');
        }

        if (productIdList === null || productIdList === undefined) {
            throw new Error('Required parameter productIdList was null or undefined when calling deleteOrderItemFromOrder.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (orderId !== undefined && orderId !== null) {
            queryParameters = queryParameters.set('orderId', <any>orderId);
        }
        if (productIdList) {
            productIdList.forEach((element) => {
                queryParameters = queryParameters.append('productIdList', <any>element);
            })
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

        return this.httpClient.request<any>('delete',`${this.basePath}/api/order/deleteorderitem`,
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
     * @param orderId
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public editOrder(body: { [key: string]: number; }, orderId: number, observe?: 'body', reportProgress?: boolean): Observable<OrderDTO>;
    public editOrder(body: { [key: string]: number; }, orderId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<OrderDTO>>;
    public editOrder(body: { [key: string]: number; }, orderId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<OrderDTO>>;
    public editOrder(body: { [key: string]: number; }, orderId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling editOrder.');
        }

        if (orderId === null || orderId === undefined) {
            throw new Error('Required parameter orderId was null or undefined when calling editOrder.');
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

        return this.httpClient.request<OrderDTO>('put',`${this.basePath}/api/order/editorder/${encodeURIComponent(String(orderId))}`,
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
     * @param branchCode
     * @param startDate
     * @param endDate
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getOrderArchivedByBrancCode(branchCode: string, startDate: string, endDate: string, observe?: 'body', reportProgress?: boolean): Observable<Array<OrderDTO>>;
    public getOrderArchivedByBrancCode(branchCode: string, startDate: string, endDate: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<OrderDTO>>>;
    public getOrderArchivedByBrancCode(branchCode: string, startDate: string, endDate: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<OrderDTO>>>;
    public getOrderArchivedByBrancCode(branchCode: string, startDate: string, endDate: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (branchCode === null || branchCode === undefined) {
            throw new Error('Required parameter branchCode was null or undefined when calling getOrderArchivedByBrancCode.');
        }

        if (startDate === null || startDate === undefined) {
            throw new Error('Required parameter startDate was null or undefined when calling getOrderArchivedByBrancCode.');
        }

        if (endDate === null || endDate === undefined) {
            throw new Error('Required parameter endDate was null or undefined when calling getOrderArchivedByBrancCode.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (branchCode !== undefined && branchCode !== null) {
            queryParameters = queryParameters.set('branchCode', <any>branchCode);
        }
        if (startDate !== undefined && startDate !== null) {
            queryParameters = queryParameters.set('startDate', <any>startDate);
        }
        if (endDate !== undefined && endDate !== null) {
            queryParameters = queryParameters.set('endDate', <any>endDate);
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

        return this.httpClient.request<Array<OrderDTO>>('get',`${this.basePath}/api/order/retrievearchivedorders`,
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
     * @param startDate
     * @param endDate
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getOrderByBrancCode(branchCode: string, startDate: string, endDate: string, observe?: 'body', reportProgress?: boolean): Observable<Array<OrderDTO>>;
    public getOrderByBrancCode(branchCode: string, startDate: string, endDate: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<OrderDTO>>>;
    public getOrderByBrancCode(branchCode: string, startDate: string, endDate: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<OrderDTO>>>;
    public getOrderByBrancCode(branchCode: string, startDate: string, endDate: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (branchCode === null || branchCode === undefined) {
            throw new Error('Required parameter branchCode was null or undefined when calling getOrderByBrancCode.');
        }

        if (startDate === null || startDate === undefined) {
            throw new Error('Required parameter startDate was null or undefined when calling getOrderByBrancCode.');
        }

        if (endDate === null || endDate === undefined) {
            throw new Error('Required parameter endDate was null or undefined when calling getOrderByBrancCode.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (branchCode !== undefined && branchCode !== null) {
            queryParameters = queryParameters.set('branchCode', <any>branchCode);
        }
        if (startDate !== undefined && startDate !== null) {
            queryParameters = queryParameters.set('startDate', <any>startDate);
        }
        if (endDate !== undefined && endDate !== null) {
            queryParameters = queryParameters.set('endDate', <any>endDate);
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

        return this.httpClient.request<Array<OrderDTO>>('get',`${this.basePath}/api/order/retrieve`,
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
     * @param startDate
     * @param endDate
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public retrieveExcelDataFromArchiviedOrders(branchCode: string, startDate: string, endDate: string, observe?: 'body', reportProgress?: boolean): Observable<OrderResultRecap>;
    public retrieveExcelDataFromArchiviedOrders(branchCode: string, startDate: string, endDate: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<OrderResultRecap>>;
    public retrieveExcelDataFromArchiviedOrders(branchCode: string, startDate: string, endDate: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<OrderResultRecap>>;
    public retrieveExcelDataFromArchiviedOrders(branchCode: string, startDate: string, endDate: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (branchCode === null || branchCode === undefined) {
            throw new Error('Required parameter branchCode was null or undefined when calling retrieveExcelDataFromArchiviedOrders.');
        }

        if (startDate === null || startDate === undefined) {
            throw new Error('Required parameter startDate was null or undefined when calling retrieveExcelDataFromArchiviedOrders.');
        }

        if (endDate === null || endDate === undefined) {
            throw new Error('Required parameter endDate was null or undefined when calling retrieveExcelDataFromArchiviedOrders.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (branchCode !== undefined && branchCode !== null) {
            queryParameters = queryParameters.set('branchCode', <any>branchCode);
        }
        if (startDate !== undefined && startDate !== null) {
            queryParameters = queryParameters.set('startDate', <any>startDate);
        }
        if (endDate !== undefined && endDate !== null) {
            queryParameters = queryParameters.set('endDate', <any>endDate);
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

        return this.httpClient.request<OrderResultRecap>('get',`${this.basePath}/api/order/retrieveexceldatafromarchiviedorders`,
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
     * @param productId
     * @param branchCode
     * @param startDate
     * @param endDate
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public retrieveSingleProductDetailsForRangeDateOrders(productId: number, branchCode: string, startDate: string, endDate: string, observe?: 'body', reportProgress?: boolean): Observable<{ [key: string]: OrderItemDto; }>;
    public retrieveSingleProductDetailsForRangeDateOrders(productId: number, branchCode: string, startDate: string, endDate: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<{ [key: string]: OrderItemDto; }>>;
    public retrieveSingleProductDetailsForRangeDateOrders(productId: number, branchCode: string, startDate: string, endDate: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<{ [key: string]: OrderItemDto; }>>;
    public retrieveSingleProductDetailsForRangeDateOrders(productId: number, branchCode: string, startDate: string, endDate: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (productId === null || productId === undefined) {
            throw new Error('Required parameter productId was null or undefined when calling retrieveSingleProductDetailsForRangeDateOrders.');
        }

        if (branchCode === null || branchCode === undefined) {
            throw new Error('Required parameter branchCode was null or undefined when calling retrieveSingleProductDetailsForRangeDateOrders.');
        }

        if (startDate === null || startDate === undefined) {
            throw new Error('Required parameter startDate was null or undefined when calling retrieveSingleProductDetailsForRangeDateOrders.');
        }

        if (endDate === null || endDate === undefined) {
            throw new Error('Required parameter endDate was null or undefined when calling retrieveSingleProductDetailsForRangeDateOrders.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (productId !== undefined && productId !== null) {
            queryParameters = queryParameters.set('productId', <any>productId);
        }
        if (branchCode !== undefined && branchCode !== null) {
            queryParameters = queryParameters.set('branchCode', <any>branchCode);
        }
        if (startDate !== undefined && startDate !== null) {
            queryParameters = queryParameters.set('startDate', <any>startDate);
        }
        if (endDate !== undefined && endDate !== null) {
            queryParameters = queryParameters.set('endDate', <any>endDate);
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

        return this.httpClient.request<{ [key: string]: OrderItemDto; }>('get',`${this.basePath}/api/order/retrievesingleproddetailsforbranchordersandrangedate`,
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
     * @param orderId
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateOrder(body: Array<OrderItemDto>, orderId: number, observe?: 'body', reportProgress?: boolean): Observable<OrderDTO>;
    public updateOrder(body: Array<OrderItemDto>, orderId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<OrderDTO>>;
    public updateOrder(body: Array<OrderItemDto>, orderId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<OrderDTO>>;
    public updateOrder(body: Array<OrderItemDto>, orderId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling updateOrder.');
        }

        if (orderId === null || orderId === undefined) {
            throw new Error('Required parameter orderId was null or undefined when calling updateOrder.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (orderId !== undefined && orderId !== null) {
            queryParameters = queryParameters.set('orderId', <any>orderId);
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

        return this.httpClient.request<OrderDTO>('put',`${this.basePath}/api/order/updatetoprontoapartire`,
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
     * @param orderId
     * @param orderStatus
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateOrderStatus(orderId: number, orderStatus: string, observe?: 'body', reportProgress?: boolean): Observable<OrderDTO>;
    public updateOrderStatus(orderId: number, orderStatus: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<OrderDTO>>;
    public updateOrderStatus(orderId: number, orderStatus: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<OrderDTO>>;
    public updateOrderStatus(orderId: number, orderStatus: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (orderId === null || orderId === undefined) {
            throw new Error('Required parameter orderId was null or undefined when calling updateOrderStatus.');
        }

        if (orderStatus === null || orderStatus === undefined) {
            throw new Error('Required parameter orderStatus was null or undefined when calling updateOrderStatus.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (orderId !== undefined && orderId !== null) {
            queryParameters = queryParameters.set('orderId', <any>orderId);
        }
        if (orderStatus !== undefined && orderStatus !== null) {
            queryParameters = queryParameters.set('orderStatus', <any>orderStatus);
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

        return this.httpClient.request<OrderDTO>('put',`${this.basePath}/api/order/updatestatus`,
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
     * @param orderId
     * @param storageId
     * @param userName
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateOrderToArchived(body: Array<OrderItemDto>, orderId: number, storageId: number, userName: string, observe?: 'body', reportProgress?: boolean): Observable<OrderDTO>;
    public updateOrderToArchived(body: Array<OrderItemDto>, orderId: number, storageId: number, userName: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<OrderDTO>>;
    public updateOrderToArchived(body: Array<OrderItemDto>, orderId: number, storageId: number, userName: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<OrderDTO>>;
    public updateOrderToArchived(body: Array<OrderItemDto>, orderId: number, storageId: number, userName: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling updateOrderToArchived.');
        }

        if (orderId === null || orderId === undefined) {
            throw new Error('Required parameter orderId was null or undefined when calling updateOrderToArchived.');
        }

        if (storageId === null || storageId === undefined) {
            throw new Error('Required parameter storageId was null or undefined when calling updateOrderToArchived.');
        }

        if (userName === null || userName === undefined) {
            throw new Error('Required parameter userName was null or undefined when calling updateOrderToArchived.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (orderId !== undefined && orderId !== null) {
            queryParameters = queryParameters.set('orderId', <any>orderId);
        }
        if (storageId !== undefined && storageId !== null) {
            queryParameters = queryParameters.set('storageId', <any>storageId);
        }
        if (userName !== undefined && userName !== null) {
            queryParameters = queryParameters.set('userName', <any>userName);
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

        return this.httpClient.request<OrderDTO>('put',`${this.basePath}/api/order/updatetoarchiviato`,
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
     * @param orderId
     * @param storageId
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateOrderToDelivered(body: Array<OrderItemDto>, orderId: number, storageId: number, observe?: 'body', reportProgress?: boolean): Observable<OrderDTO>;
    public updateOrderToDelivered(body: Array<OrderItemDto>, orderId: number, storageId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<OrderDTO>>;
    public updateOrderToDelivered(body: Array<OrderItemDto>, orderId: number, storageId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<OrderDTO>>;
    public updateOrderToDelivered(body: Array<OrderItemDto>, orderId: number, storageId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling updateOrderToDelivered.');
        }

        if (orderId === null || orderId === undefined) {
            throw new Error('Required parameter orderId was null or undefined when calling updateOrderToDelivered.');
        }

        if (storageId === null || storageId === undefined) {
            throw new Error('Required parameter storageId was null or undefined when calling updateOrderToDelivered.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (orderId !== undefined && orderId !== null) {
            queryParameters = queryParameters.set('orderId', <any>orderId);
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

        return this.httpClient.request<OrderDTO>('put',`${this.basePath}/api/order/updatetoconsegnato`,
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

}