import { AbstractControl } from "@angular/forms";

export function passwordValidation(control: AbstractControl): {[key: string]: boolean} | null{
    if(control && (control.value !== null || control.value !== undefined)){
        const passwordControl = control.root.get('password');
        const confirmPassword = control.value;

        if(passwordControl){
            const password = passwordControl.value;
            if(password !== confirmPassword){
                return { misMatch: true }
            }
        }
    }
    return null;
}