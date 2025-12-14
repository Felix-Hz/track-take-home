import { Modal, type ModalProps } from "../modal/modal.tsx";
import { getBrandNameById } from "../../lib/utils/brands.ts";
import { formatDateTime } from "../../lib/utils/dates.ts";
import styles from "./insight-details.module.css";
import type { Insight } from "../../schemas/insight.ts";
import VeryInterestingImg from "../../assets/very-interesting.jpg";

type InsightDetailModalProps = ModalProps & { insight: Insight | null };

export const InsightDetailsModal = (
  { open, onClose, insight }: InsightDetailModalProps,
) => {
  return (
    <Modal
      open={open}
      onClose={() => onClose()}
    >
      {insight !== null &&
        (
          <div className={styles["insight-view-modal"]}>
            <h2 className={styles.heading}>Insight Details</h2>
            <div className={styles["insight-view-content"]}>
              <div className={styles["insight-view-info"]}>
                <div>
                  <strong>Brand:</strong> {getBrandNameById(insight.brand)}
                </div>
                <div>
                  <strong>Created:</strong> {formatDateTime(insight.createdAt)}
                </div>
                <div>
                  <strong>Insight:</strong> {insight.text}
                </div>
              </div>
              <img
                src={VeryInterestingImg}
                alt="Meme depicting something very interesting"
              />
            </div>
          </div>
        )}
    </Modal>
  );
};
