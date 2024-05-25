export default function ValidateGetinTouch(values) {
    let errors = {};

    if (!values.name.trim()) {
        errors.name = "Name is required";
    } else if (values.name.trim().length > 22) {
        errors.name = "Name should not exceed 22 characters";
    } else if (!/^[\w]+(?: [\w]+)?$/.test(values.name.trim())) {
        errors.name = "Name should contain at most one space";
    }

    if (!values.email.trim()) {
        errors.email = "Email is required";
    } else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(values.email)) {
        errors.email = "Invalid email address";
    }

    if (!values.subject) {
        errors.message = "Subject is required";
    }

    if (!values.message) {
        errors.message = "Message is required";
    } else {
        const wordCount = values.message.trim().split(/\s+/).length;
        if (wordCount < 30 || wordCount > 300) {
            errors.message = "Message should contain 30 to 300 words";
        }
    }


    return errors;
}
