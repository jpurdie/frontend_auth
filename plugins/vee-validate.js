import { extend } from "vee-validate";
/*eslint-disable */
import {
  required,
  alpha,
  alpha_spaces,
  min,
  max,
  email,
  numeric,
  integer
} from "vee-validate/dist/rules";

// install the 'required' rule.

extend("alpha_spaces", {
  ...alpha_spaces,
  message:
    "The {_field_} field may only contain alphabetic characters as well as spaces"
});
/* eslint-enable */
extend("required", {
  ...required,
  message: "The {_field_} field is required"
});

extend("alpha", {
  ...alpha,
  message: "The {_field_} field may only contain alphabetic characters"
});

extend("min", {
  ...min,
  message: "The {_field_} field must be at least {length} characters"
});

extend("max", {
  ...max,
  message: "The {_field_} field may not be greater than {length} charactersx"
});

extend("email", {
  ...email,
  message: "The {_field_} field must be a valid email"
});

extend("numeric", {
  ...numeric,
  message: "The {_field_} field may only contain numeric characters"
});

extend("integer", {
  ...integer,
  message: "The {_field_} field must be an integer"
});
