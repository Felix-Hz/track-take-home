import { BRANDS } from "../../lib/consts.ts";
import { Button } from "../button/button.tsx";
import { Modal, type ModalProps } from "../modal/modal.tsx";
import styles from "./add-insight.module.css";

type AddInsightProps = ModalProps;

/**
 * Handle form submission side-effects when adding insights:
 * -----
 * + Add the insight
 * + Reload the page to get updated insights
 */
const handleAddInsight = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const brand = Number(formData.get("brand"));
  const text = formData.get("text");

  try {
    const response = await fetch("/api/insights/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ brand, text }),
    });
    if (!response.ok) {
      alert("Failed to add insight");
      throw new Error("Something went wrong", { cause: response });
    }
    // Reload to get udpated insights, navigation will reset the modal state due to unmounting
    globalThis.location.reload();
    // NOTE: Navigation UX feels bad maybe just update insights state in parent component to rerender
  } catch (e) {
    console.error("Failed to add insight:", e);
  }
};

export const AddInsight = (props: AddInsightProps) => {
  return (
    <Modal {...props}>
      <h1 className={styles.heading}>Add a new insight</h1>
      <form className={styles.form} onSubmit={handleAddInsight}>
        <label className={styles.field}>
          Brand
          <select className={styles["field-input"]} name="brand">
            ˆ
            {BRANDS.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </label>
        <label className={styles.field}>
          Insight
          <textarea
            required
            className={styles["field-input"]}
            name="text"
            rows={5}
            minLength={1}
            placeholder="Something insightful..."
          />
        </label>
        <Button className={styles.submit} type="submit" label="Add insight" />
      </form>
    </Modal>
  );
};
