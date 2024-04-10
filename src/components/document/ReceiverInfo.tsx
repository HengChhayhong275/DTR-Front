import { SelfRegisteredRecord } from "@/@types/self-registered-record";
import { FormatDateTime } from "../functions/FormatDateTime";
import { OtherRegisteredRecord } from "@/@types";

export const ReceiverInfo = ({
  record,
}: {
  record: SelfRegisteredRecord | OtherRegisteredRecord;
}) => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between w-full">
        <h2 className="text-lg font-semibold">Receiver Info</h2>
      </div>

      <div className="flex gap-x-4">
        <div>
          <p>Name</p>
          <p>Unit</p>
          <p>Received at</p>
        </div>
        <div>
          <p>
            : {record?.transaction?.receiver?.firstNameEn}{" "}
            {record?.transaction?.receiver?.lastNameEn}
          </p>
          <p>: {record?.transaction?.receiver?.unit.name}</p>

          <p>: {FormatDateTime(record?.transaction?.updatedAt)}</p>
        </div>
      </div>
    </div>
  );
};
