import { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure
} from '@chakra-ui/react'

function Popup() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const lastPopupDate = localStorage.getItem('lastPopupDate');
    const currentDate = new Date().toDateString();

    if (!lastPopupDate || lastPopupDate !== currentDate) {
      setShowPopup(true);
    }
  }, []);

  function handlePopupClose() {
    const currentDate = new Date().toDateString();
    localStorage.setItem('lastPopupDate', currentDate);
    setShowPopup(false);
  }

  return (
    <>
      {showPopup && (
    <Modal isOpen={showPopup} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Disclaimer !</ModalHeader>
          <ModalBody>
                <p>
Disclaimer: This website is a testnet environment for non-fungible tokens (NFTs). All NFTs on this site are for testing purposes only and have no real-world value. The testnet environment may not be stable, and NFTs may be lost or destroyed at any time without warning. By using this website, you acknowledge and agree that all transactions are at your own risk, and the website owner or/and developer is not responsible for any losses or damages that may occur. This website should not be used for any commercial or investment purposes. Please ensure that you fully understand the risks before using this website.
                </p>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handlePopupClose}>
              Understood
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      )}
    </>
  );
}

export default Popup;
