"use client"
import { useState, useEffect, useRef } from "react";
import Quagga from "quagga";
import Breadcrumbs from "../../components/Breadcrumbs";
import {
  Spin,
  Input,
  Button
} from "antd";
import { useFetchByLoad } from "../../contexts";
import { ViewData } from "../products/ViewData";
const resource = "products";

export default function Lists() {
  const [load, setLoad] = useState(true)
  const barcodeRef = useRef(null);
  const { fetch, data, loading } = useFetchByLoad();
  const fetchData = (sku: any) => {
    fetch({ url: resource, query: JSON.stringify({ skip: 0, take: 1, sku }) })
    // Quagga.stop();
    setLoad(false)
  }

  const initializeScanner = () => {
    setLoad(true)
    Quagga.init({
      inputStream: {
        name: 'Live',
        type: 'LiveStream',
        target: barcodeRef.current,
        constraints: {
          width: 640,
          height: 480,
          facingMode: 'environment'
        },
      },
      decoder: {
        readers: ['ean_reader', 'upc_reader'],
      },
    }, (err: any) => {
      if (err) {
        console.error('Error initializing Quagga:', err);
        return;
      }
      Quagga.start();
    });

    Quagga.onDetected((result: any) => {
      if (result?.codeResult?.code) {
        console.log('Barcode', result?.codeResult?.code);
        fetchData(result?.codeResult?.code)
      }
    });
  };

  useEffect(() => {
    initializeScanner()
    return () => {
      Quagga.stop();
    };
  }, []);

  return (
    <>
      <Breadcrumbs pageName="Scanner" />
      <div className="viewDetails">
        {loading && (<div style={{ textAlign: 'center' }}><Spin /></div>)}

        {load && (<div ref={barcodeRef} style={{ width: '100%', height: 100, textAlign: "center" }}>
          <Input placeholder="Basic usage" onChange={(obj) => fetchData(obj.target.value)} style={{ margin: 20, width: "80%" }} />
        </div>)}

        {!load && (<div style={{ width: '100%', height: 100, textAlign: "center", clear: "both" }}>
          {/* <Button onClick={() => setLoad(true)}>Load</Button> */}
        </div>)}
        {(!load && data && data?.data) && (<div className="viewDetails">
          <ViewData data={data.data[0]} />
        </div>)}
      </div>
    </>
  );
}