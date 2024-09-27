import {Component, inject, Input} from '@angular/core';
import {FormControllerService, FormDTO} from "../../../../../../core/restaurant_service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {environment} from "../../../../../../../environments/environment";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatButtonModule} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatIconModule} from "@angular/material/icon";
import {FormsModule} from "@angular/forms";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {MatChipInputEvent, MatChipsModule} from "@angular/material/chips";
import {MatAutocompleteModule, MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {MatInputModule} from "@angular/material/input";
import FormStatusEnum = FormDTO.FormStatusEnum;
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatSlideToggleChange, MatSlideToggleModule} from "@angular/material/slide-toggle";

@Component({
    selector: 'app-formcard',
    templateUrl: './formcard.component.html',
    imports: [
        MatProgressBarModule,
        MatButtonModule,
        RouterLink,
        MatTooltipModule,
        MatIconModule,
        FormsModule,
        NgClass,
        MatChipsModule,
        MatAutocompleteModule,
        MatInputModule,
        NgForOf,
        NgIf,
        MatSlideToggleModule
    ],
    standalone: true
})
export class FormcardComponent {

    @Input() form: FormDTO;
    @Input() tooltip: string;

    constructor(
        private _snackBar: MatSnackBar,
        private _formController: FormControllerService) {

    }

    copyToClipboard(formCode: string) {
        const textarea = document.createElement('textarea');
        textarea.value = this.getFormUrl(formCode);
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);

        this._snackBar.open('Testo copiato 😎', 'Undo', {
            duration: 3000,
        });
    }

    getFormUrl(formCode: string) {
        return environment.formUrl + '/' +  formCode;
    }

    getIframeUrl(formCode: string) {
        return `<div style="position: relative; width: 100%; height: 0; padding-bottom: 56.25%;">
                    <iframe
                        src="${this.getFormUrl(formCode)}"
                        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
                    </iframe>
                </div>`;
    }

    updateRedirectPage(form: FormDTO): void {
        console.log('Updated Redirect Page for Form ID:', form.formId);
        console.log('New Redirect Page:', form.redirectPage);

        this._formController.editForm(form).subscribe(
            formDto => {
                this._snackBar.open('Redirect page aggiornata [' + formDto.redirectPage + ']', 'Undo', {
                    duration: 3000,
                });
            },
            error => {
                this._snackBar.open('error: ' + error.toString(), 'Undo', {
                    duration: 3000,
                });
            }
        );
    }

    protected readonly FormStatusEnum = FormStatusEnum;




    readonly separatorKeysCodes: number[] = [ENTER, COMMA];
    currentTag: string = ''; // Using a simple string instead of model
    tags: string[] = [''];
    defaultsTag: string[] = ['Cena', 'Pranzo', 'Festivo', 'SantoPatrono', 'Risparmiatori', 'Facoltosi'];

    // Filtered fruits based on the current input
    get filteredFruits(): string[] {
        const lowerCaseFruit = this.currentTag.toLowerCase();
        return lowerCaseFruit
            ? this.defaultsTag.filter(fruit => fruit.toLowerCase().includes(lowerCaseFruit))
            : this.defaultsTag.slice();
    }

    readonly announcer = inject(LiveAnnouncer);

    add(event: MatChipInputEvent): void {
        const value = (event.value || '').trim();

        // Add our fruit
        if (value) {
            this.tags.push(value);
        }

        // Clear the input value
        this.currentTag = '';
    }

    remove(fruit: string): void {
        const index = this.tags.indexOf(fruit);
        if (index >= 0) {
            this.tags.splice(index, 1);
            this.announcer.announce(`Removed ${fruit}`);
        }
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        this.tags.push(event.option.viewValue);
        this.currentTag = '';
        event.option.deselect();
    }

    trackByFn(index: number, item: string): number {
        return index; // or return item.id if your items have unique ids
    }

    onFileSelected($event: Event) {

    }

    onToggle($event: MatSlideToggleChange) {

        if(this.form.formStatus == FormStatusEnum.ATTIVO){
            this.form.formStatus = FormStatusEnum.SOSPESO;
        }else{
            this.form.formStatus = FormStatusEnum.ATTIVO;
        }


        this._formController.editForm(this.form).subscribe(
            formDto => {
                this._snackBar.open(formDto.formName + ' è ora in stato ' + formDto.formStatus + '', 'Undo', {
                    duration: 3000,
                });
            },
            error => {
                this._snackBar.open('error: ' + error.toString(), 'Undo', {
                    duration: 3000,
                });
            }
        );
    }

    deleteForm() {

        this.form.formStatus = FormStatusEnum.CANCELLATO;

        this._formController.editForm(this.form).subscribe(
            formDto => {
                this._snackBar.open(formDto.formName + ' è ora in stato ' + formDto.formStatus + '', 'Undo', {
                    duration: 3000,
                });
            },
            error => {
                this._snackBar.open('error: ' + error.toString(), 'Undo', {
                    duration: 3000,
                });
            }
        );
    }
}
