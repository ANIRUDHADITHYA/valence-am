export default function ValidateBecomeASupplier(values) {
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

    if (!values.phone) {
        errors.phone = "Phone Number is required";
    } else if (values.phone.trim().length > 15) {
        errors.phone = "Invalid Phone Number";
    }

    if (!values.company_name.trim()) {
        errors.company_name = "Company Name is required";
    }

    const regex = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/;

    if (!values.company_website) {
        errors.company_website = "Company Website is required";
    } else if (!regex.test(values.company_website)) {
        errors.company_website = "Invalid website URL";
    }

    if (!values.message) {
        errors.message = "Message is required";
    } else {
        const wordCount = values.message.trim().split(/\s+/).length;
        if (wordCount < 30 || wordCount > 500) {
            errors.message = "Message should contain 30 to 500 words";
        }
    }


    return errors;
}
