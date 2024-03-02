import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
  Button,
  useToast,
} from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { writeContract } from "@wagmi/core";
import { useContract } from "../ContractContext";
import { useNavigate } from "react-router-dom";

interface FormValues {
  title: string;
  upload: string;
  level: string;
  description: string;
}

const validationSchema = Yup.object({
  title: Yup.string().required("title is required"),
  upload: Yup.string().required("upload is required"),
  level: Yup.string().required("Level is required"),
  description: Yup.string(),
});

export function CreatePublicationDialog() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <button
        className="cursor-pointer border-none py-2.5 px-3 bg-white rounded-md overflow-hidden flex flex-row items-center justify-end"
        onClick={onOpen}
      >
        <div className="flex flex-row items-center justify-start gap-[8px] ">
          <img
            className="h-6 w-6 relative"
            alt=""
            src="/vuesaxtwotonestatus.svg"
          />
          <div className="relative text-base leading-[155%] font-medium font-body-2-body-2 text-gray-1 text-left">
            Create New
          </div>
        </div>
      </button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent bg="white">
          {/* <Button className="flex justify-end mt-6" onClick={onClose}>
            <img src="/close.svg" className="w-8 h-8" />
          </Button> */}
          {/* <ModalCloseButton color="black" /> */}
          <ModalBody className="mx-auto">
            <CreatePublicationDialogContent />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

const CreatePublicationDialogContent = () => {
  const { contractAbi, contractAddress } = useContract();
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (values: FormValues) => {
    try {
      // Smart contract write
      const { hash } = await writeContract({
        address: contractAddress,
        abi: contractAbi,
        functionName: "registerStudent",
        args: [values.title, parseInt(values.level)],
      });

      console.log("Smart contract hash:", hash);

      navigate("/matchtutors"); // Replace "/dashboard" with your actual dashboard route
    } catch (error) {
      console.error("Form submission error:", error);
      // Handle the error, e.g., show an error message to the user
    }
  };

  return (
    <Formik
      initialValues={{
        title: "",
        upload: "",
        level: "",
        description: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(formikProps) => (
        <Form>
          <>
            <div className="bg-white font-body-2-body-2 py-4">
              <div className="">
                <FormControl as="fieldset">
                  <FormLabel className="mt-6">Research Title</FormLabel>
                  <Input
                    name="title"
                    placeholder="title"
                    focusBorderColor="gray"
                    borderColor="gray"
                    className="hover:border-gray-500"
                    onChange={formikProps.handleChange}
                    onBlur={formikProps.handleBlur}
                    value={formikProps.values.title}
                  ></Input>
                  <FormLabel className="mt-6">Upload</FormLabel>
                  <Field name="upload">
                    {({
                      field,
                    }: {
                      field: {
                        name: string;
                        value: any;
                        onChange: (e: any) => void;
                        onBlur: () => void;
                      };
                    }) => (
                      <Input
                        {...field}
                        type="file"
                        placeholder="Upload"
                        focusBorderColor="gray"
                        borderColor="gray"
                        className="hover:border-gray-500"
                      />
                    )}
                  </Field>

                  <Text className="mt-6 mb-3">Description </Text>
                  <Textarea
                    name="description"
                    placeholder="Give a brief description"
                    focusBorderColor="gray"
                    borderColor="gray"
                    className="hover:border-gray-500 rounded-md mb-3"
                    size="sm"
                    onChange={formikProps.handleChange}
                    onBlur={formikProps.handleBlur}
                    value={formikProps.values.description}
                  />
                </FormControl>
                <Button
                 onClick={() =>
                  toast({
                    title: 'Research created.',
                    description: "You've successfully created a new research.",
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                  })
                }
                  isLoading={formikProps.isSubmitting}
                  className="mt-1 rounded-smi bg-gray-900 px-36 py-6 text-white h-10 text-lg font-body-2-body-2 font-thin hover:bg-black mx-auto w-full my-4"
                >
                  Submit
                </Button>
              </div>
            </div>
          </>
        </Form>
      )}
    </Formik>
  );
};
