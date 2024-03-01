"use client"
import { useState } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import { Spin, Input, Button } from "antd";
import { useFetchByLoad } from "../../contexts";
import { ViewData } from "../products/ViewData";
import { FormData } from "./FormData";
import { EditDataModal } from "../../components/Forms";
const resource = "products";

export default function Lists() {
  const { fetch, data, loading } = useFetchByLoad();
  const [detail, setDetail] = useState<any>(null);
  const [search, setSearch] = useState<any>(null);

  const fetchData = (search: any) => {
    fetch({ url: resource, query: JSON.stringify({ search }) })
  }

  return (
    <>
      <Breadcrumbs pageName="Scanner" />
      <div className="viewDetails">

        <div className="viewDetails">
          <Input autoFocus placeholder="Basic usage" onChange={(obj) => { setSearch(obj.target.value); fetchData(obj.target.value) }} />
        </div>

        {loading && (<div className="viewDetails" style={{ textAlign: "center" }}><Spin /></div>)}
        {(data && data?.data && data?.data[0]) ? (<div className="viewDetails">
          <div className="viewDetails" style={{ textAlign: "center" }}><Button type="primary" onClick={() => setDetail({ ...data?.data[0], "edit": true })}>Enter Store Location</Button></div>
          <ViewData data={data.data[0]} />
        </div>) : <div><h3 className="viewDetails">No data found!</h3></div>}

        {(detail && detail.edit) && (<EditDataModal resource={resource} close={() => { setDetail(null); fetchData(search) }} FormData={FormData} data={detail} />)}

      </div>
    </>
  );
}