import { useEffect, useState } from 'react';
import { ValidateBasicData, ValidateDimensionData, ValidatePhysicalDimensionsData, ValidateProcessData } from '../Utils/ValidateAddProduct';
import axios from "axios";
const useAddProductForms = (Validate) => {

    const [isSubmit, setIsSubmit] = useState(false);
    const [loader, setLoader] = useState(false);

    const [formControl, setFormControl] = useState(0);
    function handleFormControl() {
        setFormControl(formControl + 1)
    }

    const [basicDataError, setBasicDataError] = useState({})

    const [basicData, setBasicData] = useState({
        product_id: '',
        product_name: '',
        category_id: 0,
        product_discription: '',
        temperature: 0,
    });

    const handleBasicDataChange = (e) => {
        const { name, value } = e.target;
        setBasicData({
            ...basicData,
            [name]: value
        });
    };

    function handleBasicDataNext() {
        const errors = ValidateBasicData(basicData);
        setBasicDataError(errors);
        if (Object.keys(errors).length === 0) {
            basicData.category_id = parseInt(basicData.category_id)
            handleFormControl()
        }
    }


    /************process data */

    const [processDataError, setProcessDataError] = useState({})

    const [processData, setProcessData] = useState({
        process: []
    });

    const processValue = {
        index: 0,
        id: ''
    }

    const addEmptyProcess = () => {
        setProcessDataError({})
        setProcessData((prevState) => ({
            ...prevState,
            process: [...prevState.process, processValue]
        }));
    };
    const handleProcessDataChange = (e, index) => {
        const { name, value } = e.target;
        setProcessData((prevState) => {
            const updatedProcess = [...prevState.process];
            updatedProcess[index] = {
                ...updatedProcess[index],
                [name]: name === 'id' ? parseInt(value, 10) : value
            };
            return {
                ...prevState,
                process: updatedProcess
            };
        });
    };
    const handleDeleteProcess = (indexToDelete) => {
        setProcessData((prevState) => ({
            ...prevState,
            process: prevState.process.filter((_, index) => index !== indexToDelete)
        }));
    }



    /********************Physical Dimentions data */

    const [physicalDimensionDataError, setPhysicalDimensionDataError] = useState({})

    const [physicalDimensionsData, setPhysicalDimensionsData] = useState({
        physical_dimensions: []
    });

    const physicalDimentionValue = {
        index: 0,
        id: '',
        name: '',
        type: 'String',
        unit: '',
    }

    const addEmptyPhysicalDimention = () => {
        setPhysicalDimensionDataError({})
        setPhysicalDimensionsData((prevState) => ({
            ...prevState,
            physical_dimensions: [...prevState.physical_dimensions, physicalDimentionValue]
        }));
    };
    const handlePhysicalDimensionsDataChange = (e, index) => {
        const { name, value } = e.target;
        setPhysicalDimensionsData((prevState) => {
            const updatedPD = [...prevState.physical_dimensions];
            updatedPD[index] = {
                ...updatedPD[index],
                [name]: value
            };
            return {
                ...prevState,
                physical_dimensions: updatedPD
            };
        });
    };

    const handleDeletePD = (indexToDelete) => {
        setPhysicalDimensionsData((prevState) => ({
            ...prevState,
            physical_dimensions: prevState.physical_dimensions.filter((_, index) => index !== indexToDelete)
        }));
    };

    function handleProcessAndPhysicalNext() {
        const processDataErrors = ValidateProcessData(processData);
        setProcessDataError(processDataErrors);
        const physicalDimentionDataErrors = ValidatePhysicalDimensionsData(physicalDimensionsData);
        setPhysicalDimensionDataError(physicalDimentionDataErrors);
        if (Object.keys(processDataErrors).length === 0 && Object.keys(physicalDimentionDataErrors).length === 0) {
            handleFormControl()
        }
    }


    /******************dimention value */

    const [dimensionDataError, setDimensionDataError] = useState({})
    const [dimensionData, setDimensionData] = useState({
        dimension_values: []
    });


    const addEmptyDimensionValue = () => {
        setDimensionDataError({})
        const values = {};

        physicalDimensionsData.physical_dimensions.forEach((currentPD) => {
            values[currentPD.id] = '';
        });
        const newProcessValue = {
            index: 0,
            id: 0,
            values: { ...values }
        };

        setDimensionData((prevState) => ({
            ...prevState,
            dimension_values: [...prevState.dimension_values, newProcessValue]
        }));
    };

    const handleDimensionDataChange = (e, dimensionIndex, fieldName) => {
        const { value } = e.target;
        setDimensionData((prevState) => {
            const updatedDV = [...prevState.dimension_values];
            updatedDV[dimensionIndex] = {
                ...updatedDV[dimensionIndex],
                values: {
                    ...updatedDV[dimensionIndex].values,
                    [fieldName]: value
                }
            };
            return {
                ...prevState,
                dimension_values: updatedDV
            };
        });
    };
    const handleDeleteDimensionValue = (indexToDelete) => {
        setDimensionData((prevState) => ({
            ...prevState,
            dimension_values: prevState.dimension_values.filter((_, index) => index !== indexToDelete)
        }));

    };

    function handleSubmit() {
        const errors = ValidateDimensionData(dimensionData);
        setDimensionDataError(errors);
        if (Object.keys(errors).length === 0) {
            setIsSubmit(true)
        }
    }

    useEffect(() => {
        const addProduct = async () => {
            try {
                const data = {
                    ...basicData,
                    process: processData.process,
                    physical_dimensions: physicalDimensionsData.physical_dimensions,
                    dimension_values: dimensionData.dimension_values,
                };

                // Make POST request to the backend
                await axios.post(`${process.env.REACT_APP_API_HOST_URL}/api/products/add-product`, data, { withCredentials: true });

                // Alert user about success
                alert('Product added successfully');

                // Reload the page
                window.location.reload();

                // Set loader to false
                // Assuming you have a state for loader
                // setLoader(false);

                // Reset isSubmit to false
                setIsSubmit(false);
            } catch (error) {
                // Handle error
                console.error('Error adding product:', error);
            }
        };

        if (Object.keys(dimensionDataError).length === 0 && isSubmit) {
            addProduct();
        }
    }, [dimensionDataError, isSubmit, basicData, processData, physicalDimensionsData, dimensionData]);


    return {
        formControl,
        basicData, basicDataError, handleBasicDataChange, handleBasicDataNext,
        processData, processDataError, handleProcessDataChange, addEmptyProcess, handleDeleteProcess, handleProcessAndPhysicalNext,
        physicalDimensionsData, dimensionDataError, physicalDimensionDataError, handlePhysicalDimensionsDataChange, handleDeletePD, addEmptyPhysicalDimention, handleSubmit,
        dimensionData, handleDimensionDataChange, handleDeleteDimensionValue, addEmptyDimensionValue
    }
}


export default useAddProductForms;