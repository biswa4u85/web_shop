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
    description: "",
    status: true,
    sku: "",
    language: "",
    categories: "",
    images: "",
    tags: "",
    price: "",
    weight: "",
    taxValue: "",
    ean: "",
    supplierRef: "",
    brand: "",
    size: "",
    sizeMixed: "",
    colors: "",
    dogJacketType: "",
    supplier: "",
    dogJacketSize: ""
}

export function FormData({ initialValues, handleUpdate, loading }: any) {

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Title is required"),
        description: Yup.string().required("Description is required"),
        status: Yup.boolean().required("Status is required"),
        sku: Yup.number().required("SKU is required"),
        language: Yup.string().required("Language is required"),
        categories: Yup.string().required("Categorie is required"),
        images: Yup.string().required("Image is required"),
        tags: Yup.string().required("Tag is required"),
        price: Yup.string().required("Price is required"),
        weight: Yup.number().required("Weight is required"),
        taxValue: Yup.number().required("Tax is required"),
        ean: Yup.number().required("Ean is required"),
        supplierRef: Yup.string().required("Supplier Ref is required"),
        brand: Yup.string().required("Brand is required"),
        size: Yup.string().required("Size is required"),
        sizeMixed: Yup.string().required("Size Mixed is required"),
        colors: Yup.string().required("Color is required"),
        dogJacketType: Yup.string().required("Dog Jacket Type is required"),
        supplier: Yup.string().required("Supplier is required"),
        dogJacketSize: Yup.string().required("Dog Jacket Size is required")
    });


    return (
        <Formik
            initialValues={initialValues?.edit ? initialValues : initialData}
            validationSchema={validationSchema}
            onSubmit={(values) => handleUpdate({ ...values, sku: +values.sku, weight: +values.weight, taxValue: +values.taxValue, ean: +values.ean })}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                <div className="w-full p-3">
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
                    <div className="mb-4">
                        <InputBox
                            required={true}
                            name="sku"
                            label="SKU"
                            type="number"
                            placeholder="Enter SKU"
                            icon={<MdOutlineSubtitles />}
                        />
                    </div>
                    <div className="mb-4">
                        <InputBox
                            required={true}
                            name="language"
                            label="Language"
                            placeholder="Enter Language"
                            icon={<MdOutlineSubtitles />}
                        />
                    </div>
                    <div className="mb-4">
                        <InputBox
                            required={true}
                            name="categories"
                            label="Categorie"
                            placeholder="Enter Categorie"
                            icon={<MdOutlineSubtitles />}
                        />
                    </div>
                    <div className="mb-4">
                        <InputBox
                            required={true}
                            name="images"
                            label="Image"
                            placeholder="Enter Image"
                            icon={<MdOutlineSubtitles />}
                        />
                    </div>
                    <div className="mb-4">
                        <InputBox
                            required={true}
                            name="tags"
                            label="Tag"
                            placeholder="Enter Tag"
                            icon={<MdOutlineSubtitles />}
                        />
                    </div>
                    <div className="mb-4">
                        <InputBox
                            required={true}
                            name="price"
                            label="Price"
                            placeholder="Enter Price"
                            icon={<MdOutlineSubtitles />}
                        />
                    </div>
                    <div className="mb-4">
                        <InputBox
                            required={true}
                            name="weight"
                            label="Weight"
                            type="number"
                            placeholder="Enter Weight"
                            icon={<MdOutlineSubtitles />}
                        />
                    </div>
                    <div className="mb-4">
                        <InputBox
                            required={true}
                            name="taxValue"
                            label="Tax Value"
                            type="number"
                            placeholder="Enter Tax Value"
                            icon={<MdOutlineSubtitles />}
                        />
                    </div>
                    <div className="mb-4">
                        <InputBox
                            required={true}
                            name="ean"
                            label="Ean"
                            type="number"
                            placeholder="Enter Ean"
                            icon={<MdOutlineSubtitles />}
                        />
                    </div>
                    <div className="mb-4">
                        <InputBox
                            required={true}
                            name="supplierRef"
                            label="Supplier Ref"
                            placeholder="Enter Supplier Ref"
                            icon={<MdOutlineSubtitles />}
                        />
                    </div>
                    <div className="mb-4">
                        <InputBox
                            required={true}
                            name="brand"
                            label="Brand"
                            placeholder="Enter Brand"
                            icon={<MdOutlineSubtitles />}
                        />
                    </div>
                    <div className="mb-4">
                        <InputBox
                            required={true}
                            name="size"
                            label="Size"
                            placeholder="Enter Size"
                            icon={<MdOutlineSubtitles />}
                        />
                    </div>
                    <div className="mb-4">
                        <InputBox
                            required={true}
                            name="sizeMixed"
                            label="Size Mixed"
                            placeholder="Enter Size Mixed"
                            icon={<MdOutlineSubtitles />}
                        />
                    </div>
                    <div className="mb-4">
                        <InputBox
                            required={true}
                            name="colors"
                            label="Color"
                            placeholder="Enter Color"
                            icon={<MdOutlineSubtitles />}
                        />
                    </div>
                    <div className="mb-4">
                        <InputBox
                            required={true}
                            name="dogJacketType"
                            label="Dog Jacket Type"
                            placeholder="Enter Dog Jacket Type"
                            icon={<MdOutlineSubtitles />}
                        />
                    </div>
                    <div className="mb-4">
                        <InputBox
                            required={true}
                            name="supplier"
                            label="Supplier"
                            placeholder="Enter Supplier"
                            icon={<MdOutlineSubtitles />}
                        />
                    </div>
                    <div className="mb-4">
                        <InputBox
                            required={true}
                            name="dogJacketSize"
                            label="Dog Jacket Size"
                            placeholder="Enter Dog Jacket Size"
                            icon={<MdOutlineSubtitles />}
                        />
                    </div>
                    <div className="fixedBottom">
                        <ButtonBox value={initialValues?.edit ? "Update" : "Add new"} loading={loading} onClick={handleSubmit} />
                    </div>
                </div>
            )}
        </Formik>
    );
}