import { CaretRightOutlined } from "@ant-design/icons";
import type { CSSProperties } from "react";
import React from "react";
import type { CollapseProps } from "antd";
import { Collapse, Empty } from "antd";
import { ReceiverInfo } from "@/components/document/ReceiverInfo";
import { QRInfo } from "@/components/document/QRInfo";
import { TransactionStatusInfo } from "@/components/document/TransactionStatusInfo";
import { useGetDispatchOtherRecordQuery } from "@/store/features/document/otherRegisteredRecordApiSlice";
import { OtherRegisteredRecord } from "@/@types";

export const DispatchedOtherRecord = () => {
  const { data: dispatchedRecords } =
    useGetDispatchOtherRecordQuery(undefined);

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
      (dispatchedRecord: OtherRegisteredRecord, key: number) => {
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
              {dispatchedRecord?.transaction?.transaction_status?.pending && (
                <QRInfo record={dispatchedRecord} />
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
    <div>
      <h1 className="text-2xl font-bold mb-4">Document Dispatched List</h1>
      <p>Other's Registered Record</p>
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
