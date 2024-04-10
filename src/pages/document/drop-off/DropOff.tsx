import { DropOffList } from "@/components/document/drop-off/DropOffList";

export const DropOff = () => {
  return (
    <div className="flex flex-col w-full gap-y-4">
      <h1 className="text-2xl font-bold mb-4">Dropped Off Record List</h1>
      <DropOffList />
    </div>
  );
};
