import {ChangeDetectorRef, Component, ElementRef, inject, OnInit, ViewChild} from "@angular/core";
import {FormControl, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup} from "@angular/forms";
import {MatCheckboxChange, MatCheckboxModule} from "@angular/material/checkbox";
import {DataproviderService} from "../../../dataprovider.service";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatRippleModule} from "@angular/material/core";
import {NgForOf, NgIf} from "@angular/common";
import {BranchConfigurationDTO, FormTag} from "../../../../../../core/booking";
import {MatChipInputEvent, MatChipsModule} from "@angular/material/chips";
import {MatAutocompleteModule, MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {add} from "lodash-es";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {map, Observable, startWith} from "rxjs";
import {COMMA, ENTER} from "@angular/cdk/keycodes";

@Component({
    selector: 'tag',
    templateUrl: './tag.component.html',
    imports: [
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatButtonModule,
        MatRippleModule,
        NgIf,
        NgForOf,
        MatChipsModule,
        MatAutocompleteModule,
        ReactiveFormsModule

    ],
    standalone: true
})
export class TagComponent implements OnInit{

    branchConfigurationDTO : BranchConfigurationDTO;
    selectedProductForm: UntypedFormGroup;
    filteredTags: FormTag[];
    tags: FormTag[];
    tagsEditMode: boolean = false;

    constructor(private _changeDetectorRef: ChangeDetectorRef,
                private _dataProvideService: DataproviderService,
                private _formBuilder: UntypedFormBuilder) {

    }
    ngOnInit(): void {

        this._dataProvideService?.branchConfiguration$.subscribe((branchConfigurationDTO : BranchConfigurationDTO)=>{
            this.branchConfigurationDTO = branchConfigurationDTO;
            this.tags = this.branchConfigurationDTO?.tags;
            this.filteredTags = this.branchConfigurationDTO?.tags;

            console.log(this.branchConfigurationDTO?.tags.length)
            console.log("tags");
            console.log(this.tags);

            this.selectedProductForm = this._formBuilder.group({
                tags : this.tags ?? [[]],
            });

            this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
                startWith(null),
                map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allFruits.slice())),
            );
        })
    }


    filterTags(event): void {
        // Get the value
        const value = event.target.value.toLowerCase();

        // Filter the tags
        this.filteredTags = this.tags.filter(tag => tag.title.toLowerCase().includes(value));
    }

    filterTagsInputKeyDown(event): void {
        // Return if the pressed key is not 'Enter'
        if ( event.key !== 'Enter' )
        {
            return;
        }

        // If there is no tag available...
        if ( this.filteredTags.length === 0 )
        {
            // Create the tag
            this.createTag(event.target.value);

            // Clear the input
            event.target.value = '';

            // Return
            return;
        }

        // If there is a tag...
        const tag = this.filteredTags[0];
        const isTagApplied = this.branchConfigurationDTO.tags.find(id => id === tag.id);

        // If the found tag is already applied to the product...
        if ( isTagApplied )
        {
            // Remove the tag from the product
            this.removeTagFromProduct(tag);
        }
        else
        {
            // Otherwise add the tag to the product
            this.addTagToProduct(tag);
        }
    }

    removeTagFromProduct(tag: FormTag): void
    {
        // Remove the tag
        this.branchConfigurationDTO.tags.splice(this.branchConfigurationDTO.tags.findIndex(item => item === tag.id), 1);

        // Update the selected product form
        this.selectedProductForm.get('tags').patchValue(this.branchConfigurationDTO.tags);

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    createTag(title: string): void {
        const tag : FormTag = {
            title,
        };

        // Create tag on the server
        this._dataProvideService.createTag(tag, this.branchConfigurationDTO.branchCode);
    }

    addTagToProduct(tag: FormTag): void {
        // Add the tag
        this.branchConfigurationDTO.tags.unshift(tag);

        // Update the selected product form
        this.selectedProductForm.get('tags').patchValue(this.branchConfigurationDTO.tags);

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    toggleProductTag(tag: FormTag, change: MatCheckboxChange): void
    {
        if ( change.checked )
        {
            this.addTagToProduct(tag);
        }
        else
        {
            this.removeTagFromProduct(tag);
        }
    }

    toggleTagsEditMode(): void {
        this.tagsEditMode = !this.tagsEditMode;
    }

    shouldShowCreateTagButton(inputValue: string): boolean
    {
        return !!!(inputValue === '' || this.tags.findIndex(tag => tag.title.toLowerCase() === inputValue.toLowerCase()) > -1);
    }

    deleteTag(tag: FormTag): void
    {
        // Delete the tag from the server
        this._dataProvideService.deleteTag(tag, this.branchConfigurationDTO.branchCode);

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    updateTagTitle(tag: FormTag, event): void {
        // Update the title on the tag
        tag.title = event.target.value;

        // Update the tag on the server
        // this._inventoryService.updateTag(tag.id, tag)
        //     .pipe(debounceTime(300))
        //     .subscribe();

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }

    protected readonly add = add;











    separatorKeysCodes: number[] = [ENTER, COMMA];
    fruitCtrl = new FormControl('');
    filteredFruits: Observable<string[]>;
    tags_list: string[] = ['Lemon'];
    allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

    @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;

    announcer = inject(LiveAnnouncer);

    addX(event: MatChipInputEvent): void {
        const value = (event.value || '').trim();

        // Add our fruit
        if (value) {
            this.tags_list.push(value);
        }

        // Clear the input value
        event.chipInput!.clear();

        this.fruitCtrl.setValue(null);
    }

    remove(fruit: string): void {
        const index = this.tags_list.indexOf(fruit);

        if (index >= 0) {
            this.tags_list.splice(index, 1);

            this.announcer.announce(`Removed ${fruit}`);
        }
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        this.tags_list.push(event.option.viewValue);
        this.fruitInput.nativeElement.value = '';
        this.fruitCtrl.setValue(null);
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.allFruits.filter(fruit => fruit.toLowerCase().includes(filterValue));
    }
}
