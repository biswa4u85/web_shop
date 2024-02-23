"use client"
import { useState, useEffect } from "react";
import Breadcrumb from "../../components/Breadcrumbs";
import {
  Table,
  Tag,
  Button,
  Dropdown,
  Menu
} from "antd";
import { useFetchByLoad } from "../../contexts";
import { CiMenuKebab } from "react-icons/ci";
import { FormData } from "./FormData";
import { CreateDataDrawer, EditDataDrawer, DeleteDataModal, StatusDataModal } from "../../components/Forms";
const resource = "products";

export default function Products() {
  const [detail, setDetail] = useState<any>(null);

  const [query, setQuery] = useState({ "skip": 0, "take": 10 })
  const { fetch, data, loading } = useFetchByLoad({ url: resource, query: JSON.stringify(query) });

  console.log('data ', data)

  useEffect(() => {
    fetch()
  }, [query])

  const refreshData = () => {
    fetch()
    setDetail(null)
  }

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      sorter: true,
    },
    {
      title: "Description",
      dataIndex: "description",
      sorter: true,
    },
    {
      title: "Actions",
      dataIndex: "address",
      key: "address",
      render: (_value: any, record: any) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="1">
                <Button
                  type="link"
                  onClick={() => setDetail({ ...record, "edit": true })}
                >
                  EDIT
                </Button>
              </Menu.Item>
              <Menu.Item key="2">
                <Button
                  type="link"
                  onClick={() => setDetail({ ...record, "active": true })}
                >
                  {record.status == "active" ? "INACTIVE" : "ACTIVE"}
                </Button>
              </Menu.Item>
              <Menu.Item key="3">
                <Button
                  type="link"
                  onClick={() => setDetail({ ...record, "delete": true })}
                >
                  DELETE
                </Button>
              </Menu.Item>
            </Menu>
          }
        >
          <Button type="text" onClick={(e) => e.preventDefault()}>
            <CiMenuKebab />
          </Button>
        </Dropdown>
      ),
    },
  ];

  return (
    <>
      <Breadcrumb pageName="Batiments" />
      <div className="fixed bottom-4 right-4 z-999">
        <button onClick={() => setDetail({ "add": true })} className="px-4 py-2 font-bold text-white rounded-full shadow-lg bg-primary hover:bg-opacity-90">
          ADD
        </button>
      </div>
      <Table className="mainTable" loading={loading} dataSource={data?.data ?? []} columns={columns} pagination={{
        showQuickJumper: true,
        total: data?.count ?? 0,
        onChange: (page, pageSize) => {
          setQuery({ "skip": ((page - 1) * pageSize), "take": pageSize });
        },
      }} />
      {(detail && detail.add) && (<CreateDataDrawer resource={resource} close={refreshData} FormData={FormData} data={detail} />)}
      {(detail && detail.edit) && (<EditDataDrawer resource={resource} close={refreshData} FormData={FormData} data={detail} />)}
      {(detail && detail.delete) && (<DeleteDataModal resource={resource} close={refreshData} data={detail} />)}
      {(detail && detail.active) && (<StatusDataModal resource={resource} close={refreshData} data={detail} />)}
    </>
  );
}