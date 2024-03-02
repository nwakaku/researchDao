import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
  Input,
  Text,
  InputGroup,
  InputLeftElement,
  useToast,
  Textarea,
  FormLabel,
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import * as Yup from "yup";
import { Formik, Form } from "formik";

interface FormValues {
  info: string;
  link: string;
}

const validationSchema = Yup.object({
  info: Yup.string().required("Suggestions is required"),
  link: Yup.string().required("Link is required"),
});

export function RequestDialog() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        onClick={onOpen}
        className="rounded-md  bg-newbackground hover:bg-black px-4 text-white text-sm font-body-2-body-2 font-thin "
      >
        Request Access
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent bg="white">
          <Button
            className="flex justify-end mt-6 bg-transparent hover:bg-transparent"
            onClick={onClose}
          >
            <img src="/close.svg" />
          </Button>

          <ModalBody className="mx-auto">
            <RequestDialogContent />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

const RequestDialogContent = () => {
  const toast = useToast();
  const handleSubmit = async (values: FormValues) => {};

  return (
    <Formik
      initialValues={{
        info: "",
        link: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(formikProps) => (
        <Form className="mb-4">
          <div className="font-body-2-body-2 mb-4">
            <p className="text-3xl font-bold text-black text-center my-4 ">
              Request Contributor Access
            </p>
            <div className=" ">
              <FormLabel className="">Link to previous works</FormLabel>
              <Input
                name="link"
                placeholder="link"
                focusBorderColor="gray"
                borderColor="gray"
                className="hover:border-gray-500 mb-6"
                onChange={formikProps.handleChange}
                onBlur={formikProps.handleBlur}
                value={formikProps.values.link}
              ></Input>
              <FormLabel className="">Suggestions for improvement</FormLabel>
              <Textarea
                name="info"
                placeholder="How can we improve on this research"
                focusBorderColor="gray"
                borderColor="gray"
                className="hover:border-gray-500 rounded-md mb-3"
                size="sm"
                onChange={formikProps.handleChange}
                onBlur={formikProps.handleBlur}
                value={formikProps.values.info}
              />
            </div>
          </div>
          <Button
            onClick={() =>
              toast({
                title: "Request sent.",
                description:
                  "You've successfully sent a request to collaborate on this research.",
                status: "success",
                duration: 4000,
                isClosable: true,
              })
            }
            isLoading={formikProps.isSubmitting}
            w={{ base: "150px", md: "250px", lg: "350px" }}
            className="mt-1 rounded-smi bg-gray-900 px-36 py-6 text-white h-10 text-lg font-body-2-body-2 font-thin hover:bg-black mx-auto "
          >
            Request
          </Button>
        </Form>
      )}
    </Formik>
  );
};
