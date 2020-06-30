// Importing validator for extend rules
import {extend} from 'vee-validate';
// Import available rules
import {required, email, min} from 'vee-validate/dist/rules'

const validations = {
    apply: ()=>{
        //  Extending Validation with Custom Rules
        extend('positive',value =>{
            return value >= 0;
        });
        extend('odd', value => {
            return value % 2 !== 0;
          });
        // Loading Pre build validation rules
        extend('email', {
            ...email,
            message: "Email is in the incorrect format"
        });
        extend('required', required);
        extend('min', min);
    }
}
export default validations;
