import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatTooltipModule} from "@angular/material/tooltip";
import {Subject, takeUntil} from "rxjs";
import {RouterLink} from "@angular/router";
import {StateManagerProvider} from "../../../../../state_manager/state-manager-provider.service";
import {MatSlideToggleChange, MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {DatePipe, I18nPluralPipe, NgClass, NgForOf, NgIf, NgTemplateOutlet} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {FormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatMenuModule} from "@angular/material/menu";
import {MatSidenavModule} from "@angular/material/sidenav";
import {FormpipePipe} from "./formpipe.pipe";
import {MatChipsModule} from "@angular/material/chips";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {FormEditComponentComponent} from "./form_edit_component/form-edit-component.component";
import {FormControllerService, FormDTO} from "../../../../../core/restaurant_service";
import {RestaurantStateManagerProvider} from "../../../../../state_manager/restaurant-state-manager";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {BranchesmanagmentComponent} from "../../../../../layout/common/shortcuts/branchesmanagment.component";
import {CreateFormComponentComponent} from "./create-form-component/create-form-component.component";
import {environment} from "../../../../../../environments/environment";
import {clone} from "lodash-es";
import {QRCodeComponentModal} from "../qrcode/q-r-code-component-modal.component";
import FormStatusEnum = FormDTO.FormStatusEnum;


@Component({
    selector: 'app-formlist',
    templateUrl: './formlist.component.html',
    imports: [
        MatOptionModule,
        MatSelectModule,
        MatTooltipModule,
        MatIconModule,
        MatInputModule,
        MatSlideToggleModule,
        I18nPluralPipe,
        RouterLink,
        MatButtonModule,
        NgForOf,
        MatProgressBarModule,
        NgClass,
        NgIf,
        DatePipe,
        FormsModule,
        MatDatepickerModule,
        MatMenuModule,
        MatSidenavModule,
        FormpipePipe,
        MatChipsModule,
        MatAutocompleteModule,
        FormEditComponentComponent,
        MatDialogModule,
        NgTemplateOutlet,
        BranchesmanagmentComponent,
        CreateFormComponentComponent
    ],
    standalone: true
})
export class FormlistComponent implements OnInit, OnDestroy {

    currentStatusToExclude: FormDTO.FormStatusEnum = FormStatusEnum.CANCELLATO;

    @Input() tooltip: string;

    forms: FormDTO[];

    private _unsubscribeAll: Subject<any> = new Subject<any>();
    branchName: string;

    branchCode: string;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _restaurantStateManagerProvider: RestaurantStateManagerProvider,
        private _stateManagerProvider: StateManagerProvider,
        private _formController: FormControllerService,
        private dialog: MatDialog
    ) {}
    ngOnInit(): void {
        this._stateManagerProvider.branch$.subscribe(value => {
            if(value != null){

                this.branchName = value.name;
                this.branchCode = value.branchCode;
            }
        });

        this._restaurantStateManagerProvider.formDtos$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((formDTOS: FormDTO[]) => {
                this.forms = formDTOS;
                this._changeDetectorRef.markForCheck();
            });
    }

    ngOnDestroy(): void
    {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    changeStatus($event: MatSlideToggleChange, form: FormDTO) {
        console.log(form);
        if(form.formStatus == FormStatusEnum.ATTIVO){
            form.formStatus = FormStatusEnum.SOSPESO;
        }else{
            form.formStatus = FormStatusEnum.ATTIVO;
        }


        this._formController.editForm(form).subscribe(
            formDto => {

                this._stateManagerProvider.showToast(formDto.formName + ' è ora in stato ' + formDto.formStatus, 'success', '#3B3F5C');

            },
            error => {
                this._stateManagerProvider.showToast('error: ' + error.toString(), 'success', '#3B3F5C');

            }
        );
    }
    delete(form: FormDTO) {
        console.log(form);
        form.formStatus = FormStatusEnum.CANCELLATO;
        this._formController.editForm(form).subscribe(
            formDto => {
                this._stateManagerProvider.showToast(formDto.formName + ' è ora in stato ' + formDto.formStatus, 'success', '#3B3F5C');
                this._restaurantStateManagerProvider.retrieveFormByBranchCode();
            },
            error => {
                this._stateManagerProvider.showToast('error: ' + error.toString(), 'success', '#3B3F5C');

            }
        );
    }

    openModal(form: FormDTO): void {
        const dialogRef = this
            .dialog.open(FormEditComponentComponent, {
                data:{ formData: form},
            width: '90%',
            height: '100%',
            position: { right: '0' }, // Open from the left side
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }

    protected readonly FormDTO = FormDTO;

    copyToClipboard(formCode: string, type: number) {
        const textarea = document.createElement('textarea');
        if(type == 0){
            textarea.value = this.getIframeUrl(formCode);
        }else{
            textarea.value = this.getFormUrl(formCode);
        }

        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        this._stateManagerProvider.showToast('Testo copiato', 'success', '#3B3F5C');
    }

    getFormUrl(formCode: string) {
        return environment.formUrl + '/reservation?form=' +  formCode;
    }

    getIframeUrl(formCode: string) {
        return `<div style="position: relative; width: 100%; height: 0; padding-bottom: 56.25%;">
                    <iframe src="${this.getFormUrl(formCode)}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
                    </iframe>
                </div>`;
    }

    duplicateForm(form: FormDTO) {
        let formCopied = clone(form);
        formCopied.formId = 0;
        formCopied.formName = formCopied.formName + '_copia';
        this._formController.createForm(formCopied).subscribe(value => {
            this._stateManagerProvider.showToast('Form duplicato con successo', 'success', '#3B3F5C');
            this._restaurantStateManagerProvider.retrieveFormByBranchCode();
        });
    }

    protected readonly FormStatusEnum = FormStatusEnum;


    openTabWithFormUrl(formCode: string) {

        window.open(this.getFormUrl(formCode), '_blank');
    }

    openQrCodeModal(formCode : string) {
        this.dialog.open(QRCodeComponentModal, {
            data: { url: this.getFormUrl(formCode) },
            width: '400px' // Adjust width as necessary
        });
    }
}

