import {Component, Input, OnInit, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {NgForOf} from "@angular/common";
import {MatTooltipModule} from "@angular/material/tooltip";
import {TemplatePortal} from "@angular/cdk/portal";
import {Overlay, OverlayRef} from "@angular/cdk/overlay";
import {Subject} from "rxjs";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";

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
    MatSlideToggleModule
  ],
  standalone: true
})
export class CreateSpecialDayComponentComponent implements OnInit {

  @ViewChild('shortcutsOrigin') private _shortcutsOrigin: MatButton;
  @ViewChild('shortcutsPanel') private _shortcutsPanel: TemplateRef<any>;


  private _overlayRef: OverlayRef;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  @Input() tooltip: string;
  specialDayForm: UntypedFormGroup;


  constructor(private _overlay: Overlay,
              private _formBuilder: UntypedFormBuilder,
              private _viewContainerRef: ViewContainerRef) {
  }

  ngOnInit(): void {
    this.specialDayForm = this._formBuilder.group({
      description : ['', [Validators.required]],
    });
  }
  openPanel(): void {
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

  }

  close(): void {
    this._overlayRef.detach();
  }
}
