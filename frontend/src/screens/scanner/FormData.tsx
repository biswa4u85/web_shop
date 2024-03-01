import { InputBox, ButtonBox } from "../../components/RenderFroms";
import { Formik } from "formik";
import * as Yup from "yup";
import { MdOutlineSubtitles } from "react-icons/md";

const initialData = {
    location: ""
}

export function FormData({ initialValues, handleUpdate, loading }: any) {

    const validationSchema = Yup.object().shape({
        location: Yup.string().required("Location is required")
    });

    return (
        <Formik
            initialValues={initialValues?.edit ? initialValues : initialData}
            validationSchema={validationSchema}
            onSubmit={(values) => handleUpdate({ ...values })}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                <div className="w-full p-3">
                    <div className="mb-4">
                        <InputBox
                            required={true}
                            name="location"
                            label="Store Location"
                            placeholder="Enter Store Location"
                            icon={<MdOutlineSubtitles />}
                        />
                    </div>
                    <div>
                        <ButtonBox value={initialValues?.edit ? "Update" : "Add new"} loading={loading} onClick={handleSubmit} />
                    </div>
                </div>
            )}
        </Formik>
    );
}