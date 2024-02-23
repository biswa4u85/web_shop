import { MultiSelectBox, InputBox, TextareaBox, SelectBox, ButtonBox } from "../../components/RenderFroms";
import { Formik } from "formik";
import * as Yup from "yup";
import { useFetch } from "../../contexts";
import { FaUser, FaPhoneAlt } from "react-icons/fa";
import { MdEmail, MdOutlineSubtitles } from "react-icons/md";
import { TbMapNorth } from "react-icons/tb";
import { FaLocationDot } from "react-icons/fa6";

const initialData = {
    title: "",
    description: ""
}

export function FormData({ initialValues, handleUpdate, loading }: any) {

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Title is required"),
        description: Yup.string().required("Description is required")
    });

    // const { data: categorys } = useFetch({ url: "batimentCategorys", query: JSON.stringify({ showAll: true }) });

    return (
        <Formik
            initialValues={initialValues?.edit ? initialValues : initialData}
            validationSchema={validationSchema}
            onSubmit={(values) => handleUpdate(values)}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                <div className="w-full p-3">
                    {/* <div className="mb-4">
                        <MultiSelectBox
                            required={true}
                            tree={true}
                            multiple={false}
                            name="batimentCategoryId"
                            label={'language.catagorys_label'}
                            placeholder={'language.catagorys_placeholder'}
                            options={categorys?.data ?? []}
                        />
                    </div> */}
                    <div className="mb-4">
                        <InputBox
                            required={true}
                            name="title"
                            label="Title"
                            placeholder="Enter Title"
                            icon={<MdOutlineSubtitles />}
                        />
                    </div>
                    <div className="mb-4">
                        <TextareaBox
                            required={true}
                            name="description"
                            label="Description"
                            placeholder="Enter Description"
                        />
                    </div>
                    <div className="fixed bottom-3 right-5 z-999">
                        <ButtonBox value={initialValues?.edit ? "Update" : "Add new"} loading={loading} onClick={handleSubmit} />
                    </div>
                </div>
            )}
        </Formik>
    );
}