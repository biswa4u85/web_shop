import { Drawer } from "antd";

export const ViewDataDrawer = ({ resource, close, ViewData, data }: any) => {
    return (
        <Drawer mask={true} width="70%" title={`View ${resource}`} placement="right" onClose={() => close(null)} open={true} footer={<div className="p-7"></div>}>
            <ViewData data={data} />
        </Drawer>
    );
};