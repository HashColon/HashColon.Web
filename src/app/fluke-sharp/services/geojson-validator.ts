import { AbstractControl, FormControl, FormGroupDirective, NgForm, ValidationErrors } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
//import { valid as isGeoJsonValid } from 'geojson-validation';
const isGeoJsonValid = require('geojson-validation').valid;

function isNumber(val: any) {
    return !isNaN(Number(val))
}

export function GeoJsonValidator(control: AbstractControl): ValidationErrors | null {
    try {
        JSON.parse(control.value);
    } catch (e) {
        //        console.log('JI!: ' + control.value);
        return { jsonInvalid: true };
    }

    if (!isGeoJsonValid(JSON.parse(control.value))) {
        //      console.log("GJI!: " + control.value);
        return { geoJsonInvalid: true };
    }
    //console.log("NULL!");
    return null;
};

export function JsonValidator(control: AbstractControl): ValidationErrors | null {
    try {
        JSON.parse(control.value);
    } catch (e) {
        //        console.log('JI!: ' + control.value);
        return { jsonInvalid: true };
    }
    return null;
}

export function LatValidator(control: AbstractControl): ValidationErrors | null {

    if (isNumber(control.value)) {
        if (control.value >= 90.0 || control.value <= -90.0) {
            return { latInvalid: true };
        } else return null;
    } else {
        return { notNumber: true };
    }
}

export function LngValidator(control: AbstractControl): ValidationErrors | null {
    // if not number
    if (isNumber(control.value)) {
        if (control.value >= 180.0 || control.value <= -180.0) {
            return { lngInvalid: true };
        } else return null;
    } else {
        return { notNumber: true };
    }
}

export class JsonErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

export class GeoJsonErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}
