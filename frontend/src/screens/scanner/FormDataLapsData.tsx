import { InputBox, ButtonBox } from "../../components/RenderFroms";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import { MdOutlineSubtitles } from "react-icons/md";
import { Button } from "antd";

const initialData = {
    stores: [
        {
            location: "",
            qty: ""
        },
    ],
}



export function FormDataLaps({ initialValues, handleUpdate, loading }: any) {

    const validationSchema = Yup.object().shape({
        stores: Yup.array().of(
            Yup.object().shape({
                location: Yup.string().required("Location is required"),
                qty: Yup.string().required("Quantity is required")
            })
        )
    });

    return (
        <Formik
        initialValues={(initialValues?.stores && initialValues.stores[0]) ? initialValues : initialData}
            validationSchema={validationSchema}
            onSubmit={(values) => handleUpdate({ id: initialValues.id, stores: values.stores })}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                <>
                    <FieldArray name="stores">
                        {({ remove, push }) => (
                            <div>
                                {values.stores.length > 0 &&
                                    values?.stores?.map((store: any, index: any) => (
                                        <div className="row" key={index}>
                                            <div className="col-md-6">
                                                <InputBox
                                                    readOnly
                                                    name={`stores.${index}.location`}
                                                    placeholder="Store Location"
                                                     
                                                    
                                                />
                                            </div>

                                            <div className="col-md-3">
                                                <InputBox
                                                    readOnly
                                                    name={`stores.${index}.qty`}
                                                    placeholder="Quantity"
                                                    value={Number(store.qty) - Number(store.laps)}
                                                    
                                                />
                                            </div>

                                            <div className="col-md-3">
                                                <InputBox
                                                type='number'
                                                    required
                                                    name={`stores.${index}.laps`}
                                                    label="Store Laps"
                                                    placeholder="Laps"
                                                    icon={<MdOutlineSubtitles />}
                                                />
                                            </div>
                                            

                                        </div>
                                    ))}

                                 

                            </div>
                        )}
                    </FieldArray>

                    <ButtonBox type="submit" value='Update' loading={loading} onClick={handleSubmit} />
                </>
            )}
        </Formik>
    );
}