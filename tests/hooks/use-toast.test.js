import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { reducer } from "../../src/hooks/use-toast.js";

const t = (id, rest = {}) => ({ id, open: true, ...rest });

describe("use-toast reducer", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("ADD_TOAST", () => {
    it("prepends a new toast and slices to TOAST_LIMIT (1)", () => {
      // TOAST_LIMIT is 1 in use-toast.js, so the new toast replaces any
      // existing ones.
      const state = { toasts: [t("a"), t("b")] };
      const next = reducer(state, { type: "ADD_TOAST", toast: t("c") });
      expect(next.toasts.map((x) => x.id)).toEqual(["c"]);
    });

    it("adds a toast to an empty list", () => {
      const state = { toasts: [] };
      const next = reducer(state, { type: "ADD_TOAST", toast: t("first") });
      expect(next.toasts.map((x) => x.id)).toEqual(["first"]);
    });
  });

  describe("UPDATE_TOAST", () => {
    it("merges a patch into the matching toast", () => {
      const state = { toasts: [t("a", { title: "old" }), t("b")] };
      const next = reducer(state, {
        type: "UPDATE_TOAST",
        toast: { id: "a", title: "new" },
      });
      expect(next.toasts[0]).toMatchObject({ id: "a", title: "new", open: true });
      expect(next.toasts[1]).toEqual(t("b"));
    });

    it("is a no-op when the id does not match any toast", () => {
      const state = { toasts: [t("a"), t("b")] };
      const next = reducer(state, {
        type: "UPDATE_TOAST",
        toast: { id: "missing", title: "x" },
      });
      expect(next.toasts).toEqual(state.toasts);
    });
  });

  describe("DISMISS_TOAST", () => {
    it("sets open=false on the matching toast and leaves the others open", () => {
      const state = { toasts: [t("a"), t("b")] };
      const next = reducer(state, { type: "DISMISS_TOAST", toastId: "a" });
      expect(next.toasts[0]).toMatchObject({ id: "a", open: false });
      expect(next.toasts[1]).toMatchObject({ id: "b", open: true });
    });

    it("marks every toast open=false when no toastId is provided", () => {
      const state = { toasts: [t("a"), t("b"), t("c")] };
      const next = reducer(state, { type: "DISMISS_TOAST" });
      expect(next.toasts.every((x) => x.open === false)).toBe(true);
    });

    it("schedules the dismiss for removal (timer fires)", () => {
      const state = { toasts: [t("timer-uniq-id")] };
      reducer(state, { type: "DISMISS_TOAST", toastId: "timer-uniq-id" });
      // TOAST_REMOVE_DELAY is 1_000_000ms; advance far enough for the timer to fire.
      const countBefore = vi.getTimerCount();
      expect(countBefore).toBeGreaterThan(0);
      vi.advanceTimersByTime(1_000_000);
      expect(vi.getTimerCount()).toBeLessThan(countBefore);
    });
  });

  describe("REMOVE_TOAST", () => {
    it("removes a single toast by id", () => {
      const state = { toasts: [t("a"), t("b"), t("c")] };
      const next = reducer(state, { type: "REMOVE_TOAST", toastId: "b" });
      expect(next.toasts.map((x) => x.id)).toEqual(["a", "c"]);
    });

    it("clears the entire list when no toastId is provided", () => {
      const state = { toasts: [t("a"), t("b")] };
      const next = reducer(state, { type: "REMOVE_TOAST" });
      expect(next.toasts).toEqual([]);
    });
  });
});
