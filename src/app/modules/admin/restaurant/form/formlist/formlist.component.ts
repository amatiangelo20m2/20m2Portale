import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatTooltipModule} from "@angular/material/tooltip";
import {Subject, takeUntil} from "rxjs";
import {Router, RouterLink} from "@angular/router";
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
import {FormControllerService, FormDTO} from "../../../../../core/restaurant_service";
import {RestaurantStateManagerProvider} from "../../../../../state_manager/restaurant-state-manager";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {BranchesmanagmentComponent} from "../../../../../layout/common/shortcuts/branchesmanagment.component";
import {CreateFormComponentComponent} from "./create-form-component/create-form-component.component";
import {clone} from "lodash-es";
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
        private dialog: MatDialog,
        private router: Router
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

                this._stateManagerProvider.showToast(formDto.formName + ' è ora in stato ' + formDto.formStatus, 'success');

            },
            error => {
                this._stateManagerProvider.showToast('error: ' + error.toString(), 'success');

            }
        );
    }
    delete(form: FormDTO) {
        console.log(form);
        form.formStatus = FormStatusEnum.CANCELLATO;
        this._formController.editForm(form).subscribe(
            formDto => {
                this._stateManagerProvider.showToast(formDto.formName + ' è ora in stato ' + formDto.formStatus, 'success');
                this._restaurantStateManagerProvider.retrieveFormByBranchCode();
            },
            error => {
                this._stateManagerProvider.showToast('error: ' + error.toString(), 'success');

            }
        );
    }

    navigateToFormEditComponent(form: FormDTO): void {
        this.router.navigate([`/dashboard/forms/${form.formCode}`]);
    }

    protected readonly FormDTO = FormDTO;

    copyToClipboard(formCode: string, type: number) {
        const textarea = document.createElement('textarea');
        if(type == 0){
            // textarea.value = UtilityForm.getIframeUrl(formCode);
        }else{
            // textarea.value = UtilityForm.getFormUrl(formCode);
        }

        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        this._stateManagerProvider.showToast('Testo copiato', 'success');
    }


    duplicateForm(form: FormDTO) {
        let formCopied = clone(form);
        formCopied.formId = 0;
        formCopied.formName = formCopied.formName + '_copia';
        this._formController.createForm(formCopied).subscribe(value => {
            this._stateManagerProvider.showToast('Form duplicato con successo', 'success');
            this._restaurantStateManagerProvider.retrieveFormByBranchCode();
        });
    }

    protected readonly FormStatusEnum = FormStatusEnum;

    openTabWithFormUrl(formCode: string) {
        // window.open(this.getFormUrl(formCode), '_blank');
    }
    openQrCodeModal(formCode : string) {
        // this.dialog.open(QRCodeComponentModal, {
        //     data: { url: this.getFormUrl(formCode) },
        //     width: '400px' // Adjust width as necessary
        // });
    }
}

