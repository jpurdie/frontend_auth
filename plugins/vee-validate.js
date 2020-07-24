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
  integer,
  regex,
  confirmed
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
  message: "The {_field_} field may not be greater than {length} characters"
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

extend("regex", {
  ...regex,
  message: "The {_field_} field is not valid"
});

extend("confirmed", {
  ...confirmed,
  message: "The {_field_} field must match {target}"
});

extend("xpassword", {
  validate: value => {
    return /(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,64}$/.test(
      value
    );
  },
  params: ["xpass"],
  message:
    "The password must be 10 to 64 characters with at least one capital letter, one lowercase letter, and one numberx"
});
