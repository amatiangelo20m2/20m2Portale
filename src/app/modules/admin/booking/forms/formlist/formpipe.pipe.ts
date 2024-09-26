import { Pipe, PipeTransform } from '@angular/core';
import {FormDTO} from "../../../../../core/restaurant_service";
import FormStatusEnum = FormDTO.FormStatusEnum;

@Pipe({
    name: 'formpipe',
    standalone: true
})
export class FormpipePipe implements PipeTransform {

    transform(forms: FormDTO[], status: FormStatusEnum): FormDTO[] {
        if (!forms || !status) {
            return forms;
        }
        return forms.filter(form => form.formStatus === status);
    }



}
