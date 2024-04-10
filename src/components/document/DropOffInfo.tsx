import { FormatDateTime } from "../functions/FormatDateTime";
import { SelfRegisteredRecord } from "@/@types/self-registered-record";
import { LoadingSpinner } from "../spinner/LoadingSpinner";
import { useGetDropOffRecordByIdQuery } from "@/store/features/document/dropOffApiSlice";
import { OtherRegisteredRecord } from "@/@types";

const DropOffInfo = ({
  record,
}: {
  record: SelfRegisteredRecord | OtherRegisteredRecord;
}) => {
  const { data: dropOffRecord, isLoading } = useGetDropOffRecordByIdQuery(
    record?.transaction?.id
  );

  if (isLoading) {
    return <LoadingSpinner color="black" />;
  }

  return (
    <div className="flex flex-col">
        <h2 className="text-lg font-semibold">Drop Off Info</h2>
      <div className="flex gap-x-4">
        <div>
          <p>Unit</p>
          <p>By</p>
          <p>At</p>
        </div>
        <div>
          <p>: {dropOffRecord?.receiving_unit?.name}</p>
          <p>
            : {dropOffRecord?.sender?.firstNameEn}{" "}
            {dropOffRecord?.sender?.lastNameEn}
          </p>
          <p>: {FormatDateTime(dropOffRecord?.createdAt)}</p>
        </div>
      </div>
    </div>
  );
};

export default DropOffInfo;
