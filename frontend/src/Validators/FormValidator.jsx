import PasswordValidator from "password-validator";

var schema = new PasswordValidator();

schema
  .is().min(8) // Minimum length 8
  .is().max(100) // Maximum length 100
  .has().uppercase(1) // Must have at least 1 uppercase letter
  .has().lowercase(1) // Must have at least 1 lowercase letter
  .has().digits(1) // Must have at least 1 digit
  .has().symbols(1) // Must have at least 1 special character
  .has().not().spaces() // Should not have spaces
  .is().not().oneOf(["P@ssw0rd", "Password!23", "passWord#123", "Admin@123", "User@123"]); // Blacklist these values

export default function FormValidator(e) {
  let { name, value } = e.target;

  switch (name) {
    case "name":
    case "username":
    case "icon":
    case "pincode":
    case "city":
    case "state":
      if (!value || value.length === 0) {
        return name + " Field is required";
      } else if (value.length < 3 || value.length > 50) {
        return name + " Field Length Must Be 3 - 50 Characters";
      } else {
        return "";
      }

    case "email":
      if (!value || value.length === 0) {
        return name + " Field is required";
      } else if (value.length < 14 || value.length > 50) {
        return name + " Field Length Must Be 14 - 50 Characters";
      } else {
        return "";
      }

    case "phone":
      if (!value || value.length === 0) {
        return name + " Field is required";
      } else if (value.length < 10 || value.length > 10) {
        return name + " Field Length Must Be 10 Digits";
      } else if (!(value.startsWith("6") || value.startsWith("7") || value.startsWith("8") || value.startsWith("9"))) {
        return name + " Field Must Start With 6, 7, 8 or 9";
      } else {
        return "";
      }

    case "password":
      if (!value || value.length === 0) {
        return name + " Field is required";
      } else if (!schema.validate(value)) {
        return schema.validate(value, { details: true }).map((x)=>x.message.replaceAll("string", "Password")).join(". ");
      } else {
        return "";
      }

    case "message":
    case "question":
    case "answer":
    case "address":
      if (!value || value.length === 0) {
        return name + " Field is required";
      } else {
        return "";
      }

    case "basePrice":
      if (!value || value.length === 0) {
        return name + " Field is required";
      } else if (parseInt(value) < 1) {
        return name + " Base Price Must Be Greater Than 0";
      } else {
        return "";
      }

    case "discount":
      if (!value || value.length === 0) {
        return name + " Field is required";
      } else if (parseInt(value) < 0 || parseInt(value) > 100) {
        return name + " Discount Must Be Within 0 - 100";
      } else {
        return "";
      }

    case "stockQuantity":
      if (!value || value.length === 0) {
        return name + " Field is required";
      } else if (parseInt(value) < 0) {
        return (
          name + " Stock Quantity Must Be Value Greater Than or Equal to 0"
        );
      } else {
        return "";
      }

    default:
      return "";
  }
}
