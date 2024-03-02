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
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import * as Yup from "yup";
import { Formik, Form } from "formik";

interface FormValues {
  amount: number;
}

const validationSchema = Yup.object({
  amount: Yup.number().required("Amount is required"),
});

export function TipTutorDialog() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        onClick={onOpen}
        className="rounded-md  bg-newbackground px-4 text-white text-sm font-body-2-body-2 font-thin "
      >
        Fund Research
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
            <TipTutorDialogContent />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

const TipTutorDialogContent = () => {
  const handleSubmit = async (values: FormValues) => {};
  return (
    <Formik
      initialValues={{
        amount: 0,
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(formikProps) => (
        <Form className="mb-4">
          <div className="font-body-2-body-2 mb-4">
            <p className="text-3xl font-bold text-black text-center my-4 ">
              Contribute to Research
            </p>
            <div className="space-y-2 mt-4">
              <Text className=" text-gray1-200 ">Amount</Text>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  className="text-gray1-200"
                >
                  $
                </InputLeftElement>
                <Input
                  name="amount"
                  className="hover:border-black text-gray1-200"
                  variant="outline"
                  placeholder="Contribute to research"
                  focusBorderColor="black"
                  borderColor="grey"
                  w={{ base: "150px", md: "250px", lg: "350px" }}
                  onChange={formikProps.handleChange}
                  onBlur={formikProps.handleBlur}
                  value={formikProps.values.amount}
                />
              </InputGroup>
            </div>
          </div>
          <Button
            isLoading={formikProps.isSubmitting}
            w={{ base: "150px", md: "250px", lg: "350px" }}
            className="mt-1 rounded-smi bg-gray-900 px-36 py-6 text-white h-10 text-lg font-body-2-body-2 font-thin hover:bg-black mx-auto "
          >
            Contribute
          </Button>
        </Form>
      )}
    </Formik>
  );
};
