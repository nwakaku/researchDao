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
  review: string;
}

const validationSchema = Yup.object({
  review: Yup.string().required("Review is required"),
});

export function ReviewDialog() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        onClick={onOpen}
        className="rounded-md  bg-newbackground hover:bg-black px-4 text-white text-sm font-body-2-body-2 font-thin "
      >
        Review Research
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
            <ReviewDialogContent />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

const ReviewDialogContent = () => {
  const toast = useToast();
  const handleSubmit = async (values: FormValues) => {};

  return (
    <Formik
      initialValues={{
        review: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(formikProps) => (
        <Form className="mb-4">
          <div className="font-body-2-body-2 mb-4">
            <p className="text-3xl font-bold text-black text-center ">
              Peer Review
            </p>
            <div className=" mt-4">
              <FormLabel className="">Review </FormLabel>
              <Textarea
                name="review"
                placeholder="What improvements can we make on this"
                focusBorderColor="gray"
                borderColor="gray"
                className="hover:border-gray-500 rounded-md mb-3"
                size="sm"
                onChange={formikProps.handleChange}
                onBlur={formikProps.handleBlur}
                value={formikProps.values.review}
              />
            </div>
          </div>
          <Button
            onClick={() =>
              toast({
                title: "Review sent.",
                description:
                  "You've successfully sent a review for this research.",
                status: "success",
                duration: 4000,
                isClosable: true,
              })
            }
            isLoading={formikProps.isSubmitting}
            w={{ base: "150px", md: "250px", lg: "350px" }}
            className="mt-1 rounded-smi bg-gray-900 px-36 py-6 text-white h-10 text-lg font-body-2-body-2 font-thin hover:bg-black mx-auto "
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};
