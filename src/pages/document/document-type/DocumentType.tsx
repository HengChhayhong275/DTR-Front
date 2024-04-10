import { DocumentType } from "@/@types/document-type";
import { Accordion } from "@/components/Accordion";
import { CreateButton } from "@/components/button/CreateButton";
import { FormatDateTime } from "@/components/functions/FormatDateTime";
import { CreateDocumentTypeModal } from "@/components/modal/document-modal/CreateDocumentTypeModal";
import { UpdateDocumentTypeModal } from "@/components/modal/document-modal/UpdateDocumentTypeModal";
import { SearchFilter } from "@/components/SearchFilter";
import { LoadingSpinner } from "@/components/spinner/LoadingSpinner";
import { ToastError } from "@/components/toast/ToastError";
import { ToastSucess } from "@/components/toast/ToastSucess";
import {
  useDeleteDocumentTypeMutation,
  useGetDocumentTypesQuery,
} from "@/store/features/documentType/documentTypeApiSlice";
import { Breadcrumb, Button, Empty, Modal, Tooltip } from "antd";
import { useState } from "react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export const DocumentTypePage = () => {
  const { data: docTypes, isLoading } = useGetDocumentTypesQuery(undefined);

  const [modal, setModal] = useState(false);

  const [updateModal, setUpdateModal] = useState(false);

  const [selectedDocumentType, setSelectedDocumentType] =
    useState<DocumentType>();

  const [deleteDocumentType] = useDeleteDocumentTypeMutation();

  const handleDeleteDocumentType = async (id: string) => {
    try {
      await deleteDocumentType(id).unwrap();
      ToastSucess("Document Type Deleted Successfully.");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      ToastError(error?.data?.message);
      console.log(error);
    }
  };

  if (isLoading) {
    <LoadingSpinner color="black" />;
  }

  return (
    <div className="flex flex-col w-full gap-y-4">
      <div className="flex justify-between items-center w-full">
        <div>
          <Breadcrumb
            separator=">"
            items={[
              {
                title: <Link to={"/dashboard"}>Dashboard</Link>,
              },
              {
                title: "Document Type",
              },
            ]}
          />
          <h1 className="text-2xl font-bold mb-2">Manage Document Type</h1>
        </div>
        <CreateButton
          title="Create new type"
          onClick={() => {
            setModal(true);
          }}
        />
      </div>

      <div>
        <Accordion children={<SearchFilter />} title={"Search and Filter :"} />
      </div>

      <CreateDocumentTypeModal open={modal} setOpen={setModal} />
      <UpdateDocumentTypeModal
        open={updateModal}
        setOpen={setUpdateModal}
        documentType={selectedDocumentType}
      />
      <ToastContainer />
      {docTypes?.length === 0 ? (
        <Empty />
      ) : (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-4 py-3">
                No
              </th>
              <th scope="col" className="px-4 py-3">
                Document Type
              </th>
              <th scope="col" className="px-4 py-3">
                Created at
              </th>
              <th scope="col" className="px-4 py-3">
                Updated at
              </th>
              <th scope="col" className="px-4 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {docTypes &&
              docTypes?.map((docType: DocumentType, index: number) => (
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
                    {docType?.name}
                  </th>
                  <th
                    scope="row"
                    className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {FormatDateTime(docType?.createdAt)}
                  </th>
                  <th
                    scope="row"
                    className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {FormatDateTime(docType?.updatedAt)}
                  </th>
                  <th
                    scope="row"
                    className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white w-1/3 flex gap-x-4"
                  >
                    <Tooltip placement="top" title={"Edit"}>
                      <Button
                        type="primary"
                        className="py-2 px-4 bg-green-500 text-white rounded-lg flex gap-x-2 items-center text-base h-full hover:!bg-green-400 hover:!text-white"
                        onClick={() => {
                          setSelectedDocumentType(docType);
                          setUpdateModal(true);
                        }}
                      >
                        <FaPencilAlt />
                      </Button>
                    </Tooltip>
                    <Tooltip placement="top" title={"Delete"}>
                      <Button
                        type="primary"
                        className="items-center flex"
                        danger
                        onClick={() => {
                          Modal.confirm({
                            title:
                              "Are you sure you want to delete this document type?",
                            content: `${docType?.name}`,
                            centered: true,
                            footer: () => (
                              <>
                                <Button
                                  className="bg-red-600 hover:!text-red-600 hover:!border-red-600 text-white"
                                  onClick={() => {
                                    Modal.destroyAll();
                                  }}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  className="bg-green-500 hover:!text-green-400 hover:!border-green-400 text-white"
                                  onClick={() => {
                                    handleDeleteDocumentType(docType?.id);
                                    Modal.destroyAll();
                                  }}
                                >
                                  Sure
                                </Button>
                              </>
                            ),
                          });
                        }}
                      >
                        {isLoading ? (
                          <LoadingSpinner color="white" />
                        ) : (
                          <FaTrashAlt />
                        )}
                      </Button>
                    </Tooltip>
                  </th>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
