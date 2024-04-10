import { OtherRegisteredRecord } from "@/@types";
import { SelfRegisteredRecord } from "@/@types/self-registered-record";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { Tag } from "antd";

export const RecordStatusInfo = ({
  record,
}: {
  record: SelfRegisteredRecord | OtherRegisteredRecord | undefined;
}) => {
  return (
    <>

      {record?.record_status?.draft && (
        <Tag icon={<ClockCircleOutlined />} color="default">
          Draft
        </Tag>
      )}
      {record?.record_status?.dispatched && (
        <Tag icon={<CheckCircleOutlined />} color="success">
          Dispatched
        </Tag>
      )}
    </>
  );
};
