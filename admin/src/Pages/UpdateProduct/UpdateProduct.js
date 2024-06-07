import React from 'react';
import "./UpdateProduct.css"
import Sidebar from '../../Components/Sidebar/Sidebar';
import useUpdateProductForm from '../../Hooks/useUpdateProductForms';
import { useState } from 'react';

export default function AddProduct() {

    const [productID, setProductID] = useState("");

    function handleProductIDChange(e) {
        setProductID(e.target.value)
    }

    const {
        formControl,
        basicData, basicDataError, handleBasicDataChange, handleBasicDataNext,
        processData, processDataError, handleProcessDataChange, addEmptyProcess, handleDeleteProcess, handleProcessAndPhysicalNext,
        physicalDimensionsData, physicalDimensionDataError, handlePhysicalDimensionsDataChange, handleDeletePD, addEmptyPhysicalDimention,
        dimensionData, dimensionDataError, handleDimensionDataChange, handleDeleteDimensionValue, addEmptyDimensionValue, handleSubmit,
        fetchProductByID
    } = useUpdateProductForm();

    return (
        <div className='add-product-section'>
            <Sidebar />
            <div className='add-product-container'>
                <h1 className='page-header'>Update Product to VALENCE-AM DB</h1>
                <div className='update-search'>
                    <input type='text' placeholder='Enter Product ID' onChange={handleProductIDChange} value={productID} />
                    <button onClick={() => { fetchProductByID(productID) }}>Search</button>
                </div>
                {formControl === 0 && <div className='add-product-form'>
                    <div className='add-product-form-items form-one'>
                        <p className='form-title'>Basic Product Details</p>


                        <div className='add-product-form-items-pair'>
                            <div className="form-input-lable-pair">
                                <label>Product Name</label>
                                <input type="text" name="product_name" value={basicData.product_name} onChange={handleBasicDataChange} />
                                {basicDataError.product_name && <p className="err-msg-validation">*{basicDataError.product_name}</p>}
                            </div>
                            <div className="form-input-lable-pair">
                                <label>Category ID</label>
                                <input type="number" name="category_id" value={basicData.category_id} onChange={handleBasicDataChange} />
                                {basicDataError.category_id && <p className="err-msg-validation">*{basicDataError.category_id}</p>}
                            </div>
                            <div className="form-input-lable-pair">
                                <label>Temperature</label>
                                <input type="number" name="temperature" value={basicData.temperature} onChange={handleBasicDataChange} />
                            </div>
                        </div>
                        <div className='add-product-form-items-pair'>
                            <div className="form-input-lable-pair disc">
                                <label>Product Description</label>
                                <textarea name="product_discription" value={basicData.product_discription} onChange={handleBasicDataChange}></textarea>
                                {basicDataError.product_discription && <p className="err-msg-validation">*{basicDataError.product_discription}</p>}
                            </div>
                        </div>
                        <div className='form-control-btn'>
                            <button onClick={handleBasicDataNext}>Next</button>
                        </div>
                    </div>
                </div>}

                {formControl === 1 && <div className='add-product-form'>
                    <div className='add-product-form-items form-one'>
                        <p className='form-title'>Process Details</p>
                        <div className='add-process-input-container'>
                            <h4>Add Process</h4>
                            <i class="fa-solid fa-circle-plus" onClick={addEmptyProcess}></i>
                        </div>
                        {processDataError.process && <p className="err-msg-validation">*{processDataError.process}</p>}

                        {processData.process.length ? (
                            processData.process.map((currentProcess, index) => {
                                currentProcess.index = index;
                                return (
                                    <div key={index} className='add-product-form-items-pair process'>
                                        <div className="form-input-lable-pair index">
                                            <label>Index</label>
                                            <input type="number" name="index" value={currentProcess.index} disabled />
                                        </div>
                                        <div className="form-input-lable-pair">
                                            <label>Process ID (Refer Process Table)</label>
                                            <input
                                                type="number"
                                                name="id"
                                                value={currentProcess.id}
                                                onChange={(e) => handleProcessDataChange(e, index)}
                                            />
                                            {processDataError[`process[${index}].id`] && <p className="err-msg-validation">*{processDataError[`process[${index}].id`]}</p>}
                                        </div>
                                        {index === processData.process.length - 1 ? <div className='delete-icon'>
                                            <i class="fa-solid fa-circle-xmark" onClick={() => handleDeleteProcess(index)}></i>
                                        </div> : <div></div>}
                                    </div>
                                )
                            })
                        ) : (
                            <div></div>
                        )}
                    </div>
                </div>}


                {formControl === 1 &&
                    <div className='add-product-form'>
                        <div className='add-product-form-items sub-form'>
                            <p className='form-title'>Physical Dimensions Details</p>
                            <div className='add-process-input-container'>
                                <h4>Add Physical Dimensions</h4>
                                <i class="fa-solid fa-circle-plus" onClick={addEmptyPhysicalDimention}></i>
                            </div>
                            {physicalDimensionDataError.physical_dimensions && <p className="err-msg-validation">*{physicalDimensionDataError.physical_dimensions}</p>}
                            {physicalDimensionsData.physical_dimensions.length ? (
                                physicalDimensionsData.physical_dimensions.map((currentPD, index) => {
                                    currentPD.index = index;
                                    return (
                                        <div className='add-product-form-items-pair' key={index}>
                                            <div className="form-input-lable-pair pd">
                                                <label>Index</label>
                                                <input type="number" name="index" value={currentPD.index} disabled />
                                            </div>
                                            <div className="form-input-lable-pair pd">
                                                <label>PD ID <span>(eg. roll_size)</span></label>
                                                <input
                                                    type="text"
                                                    name="id"
                                                    value={currentPD.id}
                                                    onChange={(e) => handlePhysicalDimensionsDataChange(e, index)}
                                                />
                                                {physicalDimensionDataError[`physical_dimensions[${index}].id`] && <p className="err-msg-validation">*{physicalDimensionDataError[`physical_dimensions[${index}].id`]}</p>}
                                            </div>
                                            <div className="form-input-lable-pair pd">
                                                <label>PD Name <span>(eg. Roll Size)</span></label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={currentPD.name}
                                                    onChange={(e) => handlePhysicalDimensionsDataChange(e, index)}
                                                />
                                                {physicalDimensionDataError[`physical_dimensions[${index}].name`] && <p className="err-msg-validation">*{physicalDimensionDataError[`physical_dimensions[${index}].name`]}</p>}
                                            </div>
                                            <div className="form-input-lable-pair pd">
                                                <label>PD Unit <span>(eg. g/m²)</span></label>
                                                <input
                                                    type="text"
                                                    name="unit"
                                                    value={currentPD.unit}
                                                    onChange={(e) => handlePhysicalDimensionsDataChange(e, index)}
                                                />
                                            </div>
                                            {index === physicalDimensionsData.physical_dimensions.length - 1 ? <div className='delete-icon'>
                                                <i class="fa-solid fa-circle-xmark" onClick={() => handleDeletePD(index)}></i>
                                            </div> : <div></div>}
                                        </div>
                                    )
                                })
                            ) : (
                                <div></div>
                            )}
                            <div className='form-control-btn'>
                                <button onClick={handleProcessAndPhysicalNext}>Next</button>
                            </div>
                        </div>
                    </div>
                }

                {formControl === 2 &&
                    <div className='add-product-form'>
                        <div className='add-product-form-items sub-form'>
                            <p className='form-title'>Dimention Value Details</p>
                            <div className='add-process-input-container'>
                                <h4>Add Dimensions Values</h4>
                                <i class="fa-solid fa-circle-plus" onClick={addEmptyDimensionValue}></i>
                            </div>
                            {dimensionDataError.dimension_values && <p className="err-msg-validation">*{dimensionDataError.dimension_values}</p>}
                            {dimensionData.dimension_values.length ? (
                                dimensionData.dimension_values.map((currentDV, index) => {
                                    currentDV.index = index;
                                    currentDV.id = index;
                                    return (
                                        <div className='add-product-form-items-pair' key={index}>
                                            <div className="form-input-lable-pair pd">
                                                <label>Index</label>
                                                <input type="number" name="index" value={currentDV.index} disabled />
                                            </div>
                                            {currentDV.values ? Object.keys(currentDV.values).map((key) => (
                                                <>

                                                    <div key={key} className="form-input-lable-pair pd">
                                                        <label>{key}</label>
                                                        <input
                                                            type="text"
                                                            name={key}
                                                            value={currentDV.values[key]}
                                                            onChange={(e) => handleDimensionDataChange(e, index, key)}
                                                        />
                                                        {dimensionDataError[`dimension_values[${index}].values.${key}`] && <p className="err-msg-validation">*{dimensionDataError[`dimension_values[${index}].values.${key}`]}</p>}
                                                    </div>

                                                </>
                                            )) : ""}
                                            {index === dimensionData.dimension_values.length - 1 ? <div className='delete-icon'>
                                                <i class="fa-solid fa-circle-xmark" onClick={() => { handleDeleteDimensionValue(index) }}></i>
                                            </div> : <div></div>}
                                        </div>
                                    )
                                })
                            ) : (
                                <div></div>
                            )}
                            <div className='form-control-btn'>
                                <button onClick={handleSubmit}>Update</button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div >
    )
}
