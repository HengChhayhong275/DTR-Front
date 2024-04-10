import { Button, Input } from "antd";
import { SearchSelect } from "./search-select/SearchSelect";

export const SearchFilter = () => {
  return (
    <div>
      <Input className="h-[50px]" placeholder="Input to search" />
      <div className="grid grid-cols-2 gap-10 mt-6">
        {/* <SearchSelect  title="Select Role" /> */}
        {/* <SearchSelect title="Select Unit" /> */}
      </div>
      <div className="flex justify-center items-center mt-6">
        <Button className="py-2 px-4 bg-custom-blue text-white rounded-lg flex items-center text-base h-full hover:!border-custom-blue hover:!text-custom-blue w-fit">
          Submit
        </Button>
      </div>
    </div>
  );
};
