import { categories, processes } from "./globalVariables";

export function ValidateBasicData(values) {
    let errors = {};

    // Validate product_id
    const idPattern = /^[a-zA-Z0-9_]+$/;
    if (!values.product_id) {
        errors.product_id = 'Product ID is required';
    } else if (!idPattern.test(values.product_id)) {
        errors.product_id = 'Product ID can only contain letters, numbers, and underscores';
    }

    // Validate product_name
    const namePattern = /^[a-zA-Z0-9 ]+$/;
    if (!values.product_name) {
        errors.product_name = 'Product name is required';
    } else {
        const spaceCount = (values.product_name.match(/ /g) || []).length;
        if (spaceCount > 2) {
            errors.product_name = 'Product name can contain a maximum of 2 spaces';
        } else if (!namePattern.test(values.product_name)) {
            errors.product_name = 'Product name cannot contain special characters';
        }
    }

    // Validate category_id
    const categoryIdPattern = /^[1-9][0-9]*$/;
    if (values.category_id === 0) {
        errors.category_id = 'Category ID is required';
    } else if (!categoryIdPattern.test(values.category_id.toString())) {
        errors.category_id = 'Category ID should not contain leading zeros';
    } else if (!categories.hasOwnProperty(values.category_id)) {
        errors.category_id = 'Invalid Category ID';
    }

    // Validate product_discription
    if (!values.product_discription) {
        errors.product_discription = 'Product description is required';
    }

    return errors;
}


export function ValidateProcessData(processData) {
    let errors = {};

    const idSet = new Set(); // To store unique ids
    if (!processData.process.length) {
        errors.process = 'Product should contain atleast 1 Process.';
    }
    if (!Array.isArray(processData.process)) {
        errors.process = 'Process data must be an array';
    } else {
        processData.process.forEach((process, index) => {
            if (typeof process.id !== 'number' || process.id < 0) {
                errors[`process[${index}].id`] = 'Invalid process ID';
            } else if (idSet.has(process.id)) {
                errors[`process[${index}].id`] = 'Process ID must be unique';
            } else {
                // Validate process id against global variables here
                if (!(process.id in processes)) {
                    errors[`process[${index}].id`] = 'Invalid process ID';
                }
                idSet.add(process.id);
            }
        });
    }

    return errors;
}

export function ValidatePhysicalDimensionsData(physicalDimensionsData) {
    let errors = {};

    const idSet = new Set();
    const idRegex = /^[A-Za-z0-9_]+$/; // Regular expression to match IDs with alphanumeric characters and underscores
    const nameRegex = /^(?:\S+\s){0,2}\S+$/; // Regular expression to match names with at most 2 spaces

    if (!physicalDimensionsData.physical_dimensions.length) {
        errors.physical_dimensions = 'Product should contain atleast 1 Physical Dimension.';
    }

    physicalDimensionsData.physical_dimensions.forEach((dimention, index) => {
        // Validate ID
        if (!idRegex.test(dimention.id.trim())) {
            errors[`physical_dimensions[${index}].id`] = 'Invalid dimension ID';
        } else if (idSet.has(dimention.id.trim())) {
            errors[`physical_dimensions[${index}].id`] = 'ID must be unique';
        } else {
            idSet.add(dimention.id.trim());
        }

        // Validate Name

        if (!dimention.name.trim()) {
            errors[`physical_dimensions[${index}].name`] = 'Invalid name.';
        }
        else if (!nameRegex.test(dimention.name.trim())) {
            errors[`physical_dimensions[${index}].name`] = 'Name with atmost 2 spaces.';
        }
    });

    return errors;
}


export function ValidateDimensionData(dimensionData) {
    let errors = {};
    if (!dimensionData.dimension_values.length) {
        errors.dimension_values = 'Product should contain atleast 1 Dimension Value.';
    }


    const valueSet = new Set();

    dimensionData.dimension_values.forEach((dimension, index) => {
        const values = dimension.values;

        // Validate values object properties
        Object.keys(values).forEach((property) => {
            let value = values[property];

            // Trim the value
            value = value.trim();

            // Check for required fields
            if (!value) {
                errors[`dimension_values[${index}].values.${property}`] = 'Value is required';
            }
        });
    });

    return errors;
}
