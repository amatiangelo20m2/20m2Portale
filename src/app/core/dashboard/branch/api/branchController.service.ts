import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders,
         HttpResponse, HttpEvent }                           from '@angular/common/http';

import { Observable }                                        from 'rxjs';

import { BranchCreationEntity } from '../model/branchCreationEntity';
import { BranchResponseEntity } from '../model/branchResponseEntity';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable({providedIn: 'root'})
export class BranchControllerService {

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

        return this.httpClient.request<BranchResponseEntity>('post',`${this.basePath}/api/branch/save`,
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
