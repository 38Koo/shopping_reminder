import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalOverlay,
  Text,
} from "@yamada-ui/react";
import { useDeleteItem } from "../../hooks/useDeleteItem";

type DeleteItemModalProps = {
  isOpen: boolean;
  onClose: () => void;
  token: string | null;
  itemID: number;
};

export const DeleteItemModal = ({
  isOpen,
  onClose,
  token,
  itemID,
}: DeleteItemModalProps) => {
  const { trigger, error } = useDeleteItem({
    itemID,
  });

  const handleDelete = () => {
    if (token) {
      return trigger(token);
    }

    return alert("エラーが発生しました。再度お試しください。");
    console.log(error);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} w={"400px"} position="absolute">
      {/* // FIXME: モーダル表示時にスクロールバーが表示されていると画面がチラつく */}
      <ModalOverlay bg="blackAlpha.300" />
      <ModalBody>
        <Text>このアイテムを削除します。</Text>
        <Text>このアイテムのログも全て削除されます。</Text>
        <Text>この操作は元に戻せません。</Text>
        <Text>本当によろしいですか？</Text>
      </ModalBody>
      <ModalFooter>
        <Button colorScheme="danger" onClick={() => handleDelete()}>
          Delete
        </Button>
        <Button variant="outline" onClick={onClose}>
          キャンセル
        </Button>
      </ModalFooter>
    </Modal>
  );
};
