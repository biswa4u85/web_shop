import { Modal } from "antd";
import { usePatch } from "../../contexts";
import { toast } from 'react-toastify';
export const EditDataModal = ({ resource, close, FormData, data }: any) => {
    const { edit, data: respond, loading } = usePatch();
    const handleUpdate = (body: any) => {
        edit(resource, { ...body })
    }
    if (respond) {
        toast.success(`${resource} update successfully`);
        close()
    }
    return (
        <Modal
            open={true}
            onCancel={() => close()}
            footer={null}
        >
            <h3>{`Edit ${resource}`}</h3>
            <FormData initialValues={data} handleUpdate={handleUpdate} loading={loading} />
        </Modal>
    );
};