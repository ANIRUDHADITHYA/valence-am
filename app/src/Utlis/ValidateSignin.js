export default function ValidateSignin(values) {
    let errors = {};

    if (!values.email.trim()) {
        errors.email = "Email is required";
    } else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(values.email)) {
        errors.email = "Invalid email address";
    }

    if (!values.password.trim()) {
        errors.password = "Password is required";
    } else if (values.password.length < 8 || values.password.length > 12) {
        errors.password = "Password should be between 8 and 12 characters";
    }

    return errors;
}
