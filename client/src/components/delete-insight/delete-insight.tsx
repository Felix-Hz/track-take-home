import { Button } from "../button/button.tsx";
import { Modal, type ModalProps } from "../modal/modal.tsx";
import styles from "./delete-insight.module.css";

type DeleteInsightModalProps = ModalProps & { onConfirm(): void };

export const DeleteInsightModal = ({
  open,
  onClose,
  onConfirm,
}: DeleteInsightModalProps) => {
  return (
    <>
      <Modal open={open} onClose={() => onClose()}>
        <h2 className={styles.heading}>Delete Insight</h2>
        <p>Are you sure you want to delete this insight?</p>
        <div className={styles["insight-delete-modal"]}>
          <Button
            label="Cancel"
            theme="secondary"
            onClick={() => onClose()}
          />
          <Button
            label="Delete"
            theme="primary"
            onClick={() => onConfirm()}
          />
        </div>
      </Modal>
    </>
  );
};
