import { DropOff } from '@/@types';
import { FormatDateTime } from '@/components/functions/FormatDateTime';
import { SaveToReceiveRecordModal } from '@/components/modal/receive-modal/SaveToReceiveRecordModal';
import { useGetAllDropOffQuery } from '@/store/features/document/dropOffApiSlice';
import { Button, Empty } from 'antd';
import { useState } from 'react';

export const DropOffList = () => {

  const {data: dropOffRecords} = useGetAllDropOffQuery(undefined)

  const [selectedRecord, setSelectedRecord]  = useState<DropOff>()
  const [open, setOpen] = useState(false)


  if(dropOffRecords?.length === 0){
    return <Empty/>
  }

  return (
    <div className="relative overflow-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-4 py-3">
              No
            </th>
            <th scope="col" className="px-4 py-3">
              Document Summary
            </th>
            <th scope="col" className="px-4 py-3">
              Document Type
            </th>
            <th scope="col" className="px-4 py-3">
              Number of Copies
            </th>
            <th scope="col" className="px-4 py-3">
              Remark
            </th>
            <th scope="col" className="px-4 py-3">
              Dropped Off By
            </th>
            <th scope="col" className="px-4 py-3">
              Dropped Off At
            </th>
            <th scope="col" className=" px-6 py-3 text-start w-[200px]">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {dropOffRecords && (
            dropOffRecords?.map((dropOffRecord: DropOff, index: number) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {(index += 1)}
                </th>
                <th
                  scope="row"
                  className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {dropOffRecord?.documentOriginInfo?.summary}
                </th>
                <th
                  scope="row"
                  className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {dropOffRecord?.documentOriginInfo?.documentType.name}
                </th>
                <th
                  scope="row"
                  className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {dropOffRecord?.documentOriginInfo?.num_of_copies}
                </th>
                <th
                  scope="row"
                  className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {dropOffRecord?.documentOriginInfo?.other}
                </th>
                <td className="px-4 py-4 text-gray-900">
                {dropOffRecord?.sender?.firstNameEn} {dropOffRecord?.sender?.lastNameEn}
                </td>
                <td className="px-4 py-4 text-gray-900">
                {FormatDateTime(dropOffRecord?.createdAt)}
                  </td>

                <td className="px-4 py-4 text-gray-900 relative ">
                  <Button onClick={() => {
                    setSelectedRecord(dropOffRecord)
                    setOpen(true)
                  }} type='primary'>Save</Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <SaveToReceiveRecordModal open={open} setOpen={setOpen} record={selectedRecord}/>
    </div>
  )
}
