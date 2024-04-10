import { Field, Form } from "formik";

export const OtherRegisteredRecordForm = ({
  isLoading,
}: {
  isLoading: boolean;
}) => {
  if (isLoading) {
    <p>...</p>;
  }
  return (
    <Form className="max-w-sm mx-auto">
      {/* Reqeust Document Id = សុំលេខពី */}
      <div className="mb-5">
        <label
          htmlFor="id_owner"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Request DocID From
        </label>
        <Field
          as="select"
          name="id_owner"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-custom-blue block w-full p-2.5"
        >
          <option selected>នាយកដ្ឋានរដ្ឋបាល</option>
          <option value="ICT">នាយកដ្ឋាន ICT</option>
          <option value="EGOV">នាយកដ្ឋាន E-GOV</option>
          <option value="Fin">នាយកដ្ឋាន Finance</option>
        </Field>
      </div>

      {/* Out-Record Date = ចេញ ថ្ងៃ ខែ​ ឆ្នាំ */}
      <div className="mb-5">
        <label
          htmlFor="Date"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Out-Record Date
        </label>
        <Field
          type="text"
          name="Date"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-custom-blue block w-full p-2.5"
          placeholder=""
          required
        />
      </div>

      {/* Document summary = លេខ និង សញ្ញាសំគាល់លិខិត ឬ ប័ណ្ណផ្ញើ ប័ណ្ណបញ្ជូន */}
      <div className="mb-5">
        <label
          htmlFor="summary"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Document summary
        </label>
        <Field
          name="summary"
          // rows={4}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-custom-blue"
          placeholder="Write your thoughts here..."
        />
      </div>

      {/* Unit Receiver = អង្គភាពទទួលលិខិត */}
      <div className="mb-5">
        <label
          htmlFor="receiver"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Unit Receiver
        </label>
        <Field
          type="text"
          name="receiver"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-custom-blue block w-full p-2.5"
          placeholder="ឧៈ​ នាយកដ្ឋានរដ្ឋបាល"
          required
        />
      </div>

      {/* Amount of Letters/Envelops = ចំនួនលិខិត */}
      <div className="mb-5">
        <label
          htmlFor="number"
          className="block mb-2 text-sm font-medium text-gray-90"
        >
          Amount of letters/envelop
        </label>
        <Field
          type="text"
          name="number"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-custom-blue block w-full p-2.5"
          placeholder=""
          required
        />
      </div>

      {/* Other = ផ្សេងៗ */}
      <div className="mb-5">
        <label
          htmlFor="other"
          className="block mb-2 text-sm font-medium text-gray-90"
        >
          Other
        </label>
        <Field
          type="text"
          name="other"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-custom-blue block w-full p-2.5"
          placeholder=""
        />
      </div>

      <div className="flex justify-between">
        <button
          // type="submit"
          className="flex items-center gap-x-2 bg-custom-blue max-w-[150px] w-full justify-center mt-4 px-4 py-2 text-base font-regular text-white rounded-lg hover:bg-green-600 disabled:bg-slate-400"
        >
          Save as Draft
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="flex items-center gap-x-2 bg-green-500 max-w-[150px] w-full justify-center mt-4 px-4 py-2 text-base font-regular text-white rounded-lg hover:bg-green-600 disabled:bg-slate-400"
        >
          Submit
        </button>
      </div>
    </Form>
  );
};
