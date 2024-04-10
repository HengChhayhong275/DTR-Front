import { CaretRightOutlined } from "@ant-design/icons";
import type { CSSProperties } from "react";
import React from "react";
import type { CollapseProps } from "antd";
import { Breadcrumb, Collapse, Empty } from "antd";
import { useGetDispatchedSelfRecordQuery } from "@/store/features/document/selfRegisteredRecordApiSlice";
import { SelfRegisteredRecord } from "@/@types/self-registered-record";
import { ReceiverInfo } from "@/components/document/ReceiverInfo";
import { QRInfo } from "@/components/document/QRInfo";
import { TransactionStatusInfo } from "@/components/document/TransactionStatusInfo";
import DropOffInfo from "@/components/document/DropOffInfo";
import { Link } from "react-router-dom";
import { Accordion } from "@/components/Accordion";
import { SearchFilter } from "@/components/SearchFilter";
import { GoBackArrow } from "@/components/button/GoBackArrow";

export const DispatchedSelfRecord = () => {
  const { data: dispatchedRecords } =
    useGetDispatchedSelfRecordQuery(undefined);

  const panelStyle: React.CSSProperties = {
    marginBottom: 24,
    background: "white",
    borderRadius: 12,
    border: "none",
  };

  const getItems: (panelStyle: CSSProperties) => CollapseProps["items"] = (
    panelStyle
  ) =>
    dispatchedRecords?.map(
      (dispatchedRecord: SelfRegisteredRecord, key: number) => {
        return {
          key: key,
          label: (
            <div className="min-h-[75px] place-content-center p-4 grid grid-cols-5">
              <div>
                <p className="font-bold">Document ID</p>
                <p>{dispatchedRecord?.documentOriginInfo?.doc_given_number}</p>
              </div>
              <div>
                <p className="font-bold">Summary</p>
                <p>{dispatchedRecord?.documentOriginInfo?.summary}</p>
              </div>
              <div>
                <p className="font-bold">Status</p>
                <TransactionStatusInfo record={dispatchedRecord} />
              </div>
              <div>
                <p className="font-bold">Published Date</p>
                <p>
                  {dispatchedRecord?.documentOriginInfo?.published_date.toString()}
                </p>
              </div>
              {dispatchedRecord?.transaction?.receiver?.unit.name && (
                <div>
                  <p className="font-bold">Received by</p>
                  <p>{dispatchedRecord?.transaction?.receiver?.unit.name}</p>
                </div>
              )}
            </div>
          ),
          children: (
            <div className="px-4">
              {/* If the document status is pending */}
              {dispatchedRecord?.transaction?.transaction_status?.pending &&
                dispatchedRecord?.transaction?.method === "QR_CODE" && (
                  <QRInfo record={dispatchedRecord} />
                )}
              {dispatchedRecord?.transaction?.transaction_status?.pending &&
                dispatchedRecord?.transaction?.method === "DROP_OFF" && (
                  <DropOffInfo record={dispatchedRecord} />
                )}

              {/* If the document status is success */}
              {dispatchedRecord?.transaction?.transaction_status?.accepted && (
                <ReceiverInfo record={dispatchedRecord} />
              )}
            </div>
          ),
          style: panelStyle,
        };
      }
    );

  return (
    <div className="flex flex-col w-full gap-y-4">
      <div>
        <GoBackArrow url="self-registered" />
      </div>
      <div className="flex justify-between items-center w-full">
        <h1 className="text-2xl font-bold mb-2">Document Dipsatched List</h1>
        <Breadcrumb
          separator=">"
          items={[
            {
              title: <Link to={"/dashboard"}>Dashboard</Link>,
            },
            {
              title: (
                <Link to={"/self-registered"}>Self-Registered Record</Link>
              ),
            },
            {
              title: "Document Dipsatched List",
            },
          ]}
        />
      </div>

      <div className="mb-4">
        <Accordion children={<SearchFilter />} title={"Search and Filter :"} />
      </div>

      <h1 className="text-2xl font-bold mb-2">Self-Registered Record</h1>
      {dispatchedRecords?.length > 0 ? (
        <Collapse
          bordered={false}
          expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
          )}
          expandIconPosition="end"
          items={getItems(panelStyle)}
          style={{ background: "rgba(245,245,245)" }}
        />
      ) : (
        <Empty />
      )}
    </div>
  );
};
