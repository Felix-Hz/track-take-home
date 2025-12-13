import { Trash2Icon } from "lucide-react";
import { useState } from "react";
import { cx } from "../../lib/cx.ts";
import { getBrandNameById } from "../../lib/utils/brands.ts";
import { formatDateTime } from "../../lib/utils/dates.ts";
import { Button } from "../button/button.tsx";
import { Modal } from "../modal/modal.tsx";
import styles from "./insights.module.css";
import type { Insight } from "../../schemas/insight.ts";

type InsightsProps = {
  insights: Insight[];
  className?: string;
};

export const Insights = ({ insights, className }: InsightsProps) => {
  const [deletingId, setDeletingId] = useState<number | null>(null);

  /**
   * Handle form submission side-effects when deleting insights:
   * -----
   * + Get user confirmation before deleting an insight (via modal)
   * + Reload the page to get updated insights
   */
  const handleDeleteInsight = async (id: number) => {
    try {
      const response = await fetch(`/api/insights/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        alert("Failed to delete insight");
        throw new Error("Something went wrong", { cause: response });
      }

      // Reload to get udpated insights, navigation will reset the modal state due to unmounting
      // NOTE: Navigation UX feels bad maybe just update insights state in parent component to rerender
      globalThis.location.reload();
    } catch (e) {
      console.error("Failed to delete insight:", e);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className={cx(className)}>
      <h1 className={styles.heading}>Insights</h1>
      <div className={styles.list}>
        {insights?.length
          ? (
            insights.map(({ id, text, createdAt, brand: brandId }) => (
              <div className={styles.insight} key={id}>
                <div className={styles["insight-meta"]}>
                  <span>{getBrandNameById(brandId)}</span>
                  <div className={styles["insight-meta-details"]}>
                    <span>{formatDateTime(createdAt)}</span>
                    <Trash2Icon
                      className={styles["insight-delete"]}
                      onClick={() => setDeletingId(id)}
                    />
                  </div>
                </div>
                <p className={styles["insight-content"]}>{text}</p>
              </div>
            ))
          )
          : <p>We have no insight!</p>}
      </div>

      <Modal open={deletingId !== null} onClose={() => setDeletingId(null)}>
        <h2 className={styles.heading}>Delete Insight</h2>
        <p>Are you sure you want to delete this insight?</p>
        <div className={styles["insight-delete-modal"]}>
          <Button
            label="Cancel"
            theme="secondary"
            onClick={() => setDeletingId(null)}
          />
          <Button
            label="Delete"
            theme="primary"
            onClick={() => deletingId && handleDeleteInsight(deletingId)}
          />
        </div>
      </Modal>
    </div>
  );
};
