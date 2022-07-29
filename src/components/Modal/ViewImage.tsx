import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  // TODO MODAL WITH IMAGE AND EXTERNAL LINK

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW={['900px']} maxH={['600px']}>
        <ModalBody maxW={['900px']} maxH={['600px']}>
          <Image src={imgUrl} alt="Image" />
        </ModalBody>
        <ModalFooter
          bgColor="pGray.800"
          h="32px"
          borderEndEndRadius="6px"
          borderEndStartRadius="6px"
        >
          <Link href={imgUrl} isExternal fontSize="1rem" mr="auto">
            Abrir original
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
