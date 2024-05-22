export default function ValidateSignup(values) {
    let errors = {};

    if (!values.name.trim()) {
        errors.name = "Name is required";
    } else if (values.name.trim().length > 22) {
        errors.name = "Name should not exceed 22 characters";
    } else if (!/^[\w]+(?: [\w]+)?$/.test(values.name.trim())) {
        errors.name = "Name should contain at most one space";
    }
    if (!values.company_name.trim()) {
        errors.company_name = "Company name is required";
    }

    if (!values.mobile) {
        errors.mobile = "Mobile number is required";
    } else if (!/^(\+\d{1,3}[- ]?)?\d{10}$/.test(values.mobile)) {
        errors.mobile = "Invalid mobile number";
    }

    if (!values.email.trim()) {
        errors.email = "Email is required";
    } else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(values.email)) {
        errors.email = "Invalid email address";
    }

    if (!values.password.trim()) {
        errors.password = "Password is required";
    } else if (values.password.length < 8 || values.password.length > 12) {
        errors.password = "Password should be between 8 and 12 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}/.test(values.password)) {
        errors.password = "Password should contain at least one uppercase letter, one lowercase letter, one digit, and one special character";
    }

    return errors;
}
