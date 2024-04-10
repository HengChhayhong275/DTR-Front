import { OtherRegisteredRecord } from "@/@types";
import { SelfRegisteredRecord } from "@/@types/self-registered-record";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { Tag } from "antd";

export const TransactionStatusInfo = ({
  record,
}: {
  record: SelfRegisteredRecord | OtherRegisteredRecord | undefined;
}) => {
  return (
    <>
      {record?.transaction?.transaction_status?.pending && (
        <Tag icon={<SyncOutlined />} color="processing">
          Pending
        </Tag>
      )}
      {record?.transaction?.transaction_status?.accepted && (
        <Tag icon={<CheckCircleOutlined />} color="success">
          Success
        </Tag>
      )}
      {record?.transaction?.transaction_status?.rejected && (
        <Tag icon={<CloseCircleOutlined />} color="error">
          Rejected
        </Tag>
      )}
      {record?.record_status?.draft && (
        <Tag icon={<ClockCircleOutlined />} color="default">
          Draft
        </Tag>
      )}
    </>
  );
};
