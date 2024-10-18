import {Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {MatTooltipModule} from "@angular/material/tooltip";
import {TemplatePortal} from "@angular/cdk/portal";
import {Overlay, OverlayRef} from "@angular/cdk/overlay";
import {Subject} from "rxjs";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {DateformatitaPipe} from "../../../../../../../pages/components/pipe/dateformatita.pipe";
import {MatListModule} from "@angular/material/list";
import {DateTime} from "luxon";
import {StateManagerProvider} from "../../../../../../../../state_manager/state-manager-provider.service";
import {FormControllerService, FormDTO} from "../../../../../../../../core/restaurant_service";

@Component({
  selector: 'app-create-special-day-component',
  templateUrl: './create-special-day-component.component.html',
  imports: [
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    NgForOf,
    MatTooltipModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    DateformatitaPipe,
    NgClass,
    NgIf,
    MatListModule
  ],
  standalone: true
})
export class CreateSpecialDayComponentComponent implements OnInit {

  @ViewChild('shortcutsOrigin') private _shortcutsOrigin: MatButton;
  @ViewChild('shortcutsPanel') private _shortcutsPanel: TemplateRef<any>;

  @Input() formCode : string;
  @Output() formUpdated = new EventEmitter<FormDTO>();

  private _overlayRef: OverlayRef;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  @Input() tooltip: string;

  specialDayForm: UntypedFormGroup;

  isClosed : boolean = false;

  constructor(private _overlay: Overlay,
              private _dataServiceManager : StateManagerProvider,
              private _formBuilder: UntypedFormBuilder,
              private _formController : FormControllerService,
              private _viewContainerRef: ViewContainerRef) {

  }

  ngOnInit(): void {
    this.specialDayForm = this._formBuilder.group({
      description : ['', [Validators.required]],
      isOpen: [true]
    });
  }
  openPanelAddSpecialDayConf(): void {
    if ( !this._shortcutsPanel || !this._shortcutsOrigin ) {
      return;
    }

    if ( !this._overlayRef ) {
      this._createOverlay();
    }

    this._overlayRef.attach(new TemplatePortal(this._shortcutsPanel, this._viewContainerRef));
  }

  private _createOverlay(): void {
    // Create the overlay
    this._overlayRef = this._overlay.create({
      hasBackdrop     : true,
      backdropClass   : 'fuse-backdrop-on-mobile',
      scrollStrategy  : this._overlay.scrollStrategies.block(),
      positionStrategy: this._overlay.position()
          .flexibleConnectedTo(this._shortcutsOrigin._elementRef.nativeElement)
          .withLockedPosition(true)
          .withPush(true)
          .withPositions([
            {
              originX : 'start',
              originY : 'bottom',
              overlayX: 'start',
              overlayY: 'top',
            },
            {
              originX : 'start',
              originY : 'top',
              overlayX: 'start',
              overlayY: 'bottom',
            },
            {
              originX : 'end',
              originY : 'bottom',
              overlayX: 'end',
              overlayY: 'top',
            },
            {
              originX : 'end',
              originY : 'top',
              overlayX: 'end',
              overlayY: 'bottom',
            },
          ]),
    });

    this._overlayRef.backdropClick().subscribe(() => {
      this._overlayRef.detach();
    });
  }

  createConf() {

      console.log('date selected : ' + this.selectedDate);
      this._formController.addSpecialDayConf(this.formCode,
          this.selectedDate.toISODate(),
          this.isClosed,
          this.specialDayForm.get('description').value, 'body').subscribe(form => {
            this._dataServiceManager.showToast('Configurazione insertita correttamente', 'success');
            this.formUpdated.emit(form);
      });
  }

  close(): void {
    this._overlayRef.detach();
  }

  selectedDate: DateTime;

}
