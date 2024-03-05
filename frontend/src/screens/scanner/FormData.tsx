import { InputBox, ButtonBox } from "../../components/RenderFroms";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import { MdOutlineSubtitles } from "react-icons/md";
import { Button } from "antd";

const initialData = {
    stores: [
        {
            location: "",
            qty: 0
        },
    ],
}

export function FormData({ initialValues, handleUpdate, loading }: any) {

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
                                                    required
                                                    name={`stores.${index}.location`}
                                                    label="Store Location"
                                                    placeholder="Enter Store Location"
                                                    icon={<MdOutlineSubtitles />}
                                                />
                                            </div>

                                            <div className="col-md-4">
                                                <InputBox
                                                    required
                                                    type='number'
                                                    name={`stores.${index}.qty`}
                                                    label="Quantity"
                                                    placeholder="Quantity"
                                                    icon={<MdOutlineSubtitles />}
                                                />
                                            </div>
                                            <div className="col-md-2 d-flex align-items-center">
                                                <Button type="primary" danger onClick={() => remove(index)}>X</Button>
                                            </div>

                                        </div>
                                    ))}

                                <Button type="primary" onClick={() => push({ location: '', qty: '' })} className="mb-3">
                                    ADD
                                </Button>

                            </div>
                        )}
                    </FieldArray>

                    <ButtonBox type="submit" value='Update' loading={loading} onClick={handleSubmit} />
                </>
            )}
        </Formik>
    );
}