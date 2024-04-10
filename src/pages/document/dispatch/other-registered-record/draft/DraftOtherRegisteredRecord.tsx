import DraftOtherRegisteredRecordList from '@/components/document/dispatched-record/other-registered-record/draft/DraftOtherRegisteredRecordList'

export const DraftOtherRegisteredRecord = () => {
  return (
    <div className="flex flex-col gap-y-4">
      <h1 className="text-2xl font-bold">Draft Other Record</h1>
      <DraftOtherRegisteredRecordList />
    </div>
  )
}
