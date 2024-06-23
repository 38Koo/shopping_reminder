import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalOverlay,
  Text,
} from "@yamada-ui/react";
import { useDeleteLog } from "../../hooks/useDeleteLog";

type DeleteLogModalProps = {
  isOpen: boolean;
  onClose: () => void;
  token: string | null;
  logID: number;
};

export const DeleteLogModal = ({
  isOpen,
  onClose,
  token,
  logID,
}: DeleteLogModalProps) => {
  const { trigger, error } = useDeleteLog({
    logID: logID,
  });

  const handleDelete = () => {
    if (token) {
      return trigger(token);
    }

    return alert("エラーが発生しました。再度お試しください。");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} w={"400px"} position="absolute">
      {/* // FIXME: モーダル表示時にスクロールバーが表示されていると画面がチラつく */}
      <ModalOverlay bg="blackAlpha.300" />
      <ModalBody>
        <Text>このログを削除します。</Text>
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
