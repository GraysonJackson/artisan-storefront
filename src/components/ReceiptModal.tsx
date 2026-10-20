"use client";

import { useEffect, useRef } from "react";
import { CartItem } from "@/lib/types";
import { formatCents } from "@/lib/products";

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  receiptItems: CartItem[];
  receiptTotalInCents: number;
}

export default function ReceiptModal({
  isOpen,
  onClose,
  receiptItems,
  receiptTotalInCents,
}: ReceiptModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const dismissBtnRef = useRef<HTMLButtonElement>(null);

  // Focus management & Escape key handling
  useEffect(() => {
    if (!isOpen) return;

    const previousActiveElement = document.activeElement as HTMLElement | null;
    dismissBtnRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === "Tab" && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;
        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previousActiveElement?.focus();
    };
  }, [isOpen, onClose]);

  return (
    <div
      className={`receipt-modal-overlay fixed inset-0 w-screen h-screen bg-black/85 z-[150] items-center justify-center p-4 ${
        isOpen ? "flex" : "hidden"
      }`}
      id="receipt-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="receipt-title"
      aria-hidden={!isOpen}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        className="receipt-card w-full max-w-[480px] bg-[#faf6ee] text-[#1a1816] border-2 border-brass-border p-6 sm:p-8 rounded-[4px] shadow-[0_10px_30px_rgba(0,0,0,0.8)] font-mono relative"
      >
        <div className="receipt-header text-center border-b-2 border-dashed border-[#999] pb-4 mb-4">
          <h3
            id="receipt-title"
            className="font-display text-xl sm:text-2xl font-extrabold text-[#221f1c]"
          >
            SIDEQUEST SUPPLY
          </h3>
          <p className="text-[11px] text-[#555] mt-1 font-bold tracking-wider">
            ORDER DISPATCH #SQ-84920 // DEMO RECEIPT
          </p>
        </div>

        {/* Mandatory compliance disclaimer */}
        <div className="receipt-mandatory-notice bg-[#fef2f2] border border-[#ef4444] text-[#991b1b] p-3 rounded-[3px] text-xs sm:text-[11.5px] mb-4 text-center font-bold leading-relaxed">
          No card was charged and no confirmation email was sent.
        </div>

        <table className="receipt-items-table w-full mb-4 text-xs border-collapse">
          <thead>
            <tr className="border-b border-[#ccc] text-[#555] text-left">
              <th className="py-1.5 font-bold">ITEM</th>
              <th className="py-1.5 font-bold text-center">QTY</th>
              <th className="py-1.5 font-bold text-right">TOTAL</th>
            </tr>
          </thead>
          <tbody id="receipt-table-body">
            {receiptItems.length === 0 ? (
              <tr>
                <td colSpan={3} className="py-4 text-center text-[#777]">
                  No items listed
                </td>
              </tr>
            ) : (
              receiptItems.map((item, idx) => (
                <tr key={`${item.productId}-${item.variantId}-${idx}`} className="border-b border-[#eee]">
                  <td className="py-2 pr-2 text-[#111] font-medium">
                    {item.productTitle}{" "}
                    <span className="text-[#666]">({item.variantTitle})</span>
                  </td>
                  <td className="py-2 text-center text-[#333]">{item.quantity}</td>
                  <td className="py-2 pl-2 text-right text-[#111] font-bold num">
                    {formatCents(item.unitPriceInCents * item.quantity)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="receipt-total-row border-t-2 border-[#221f1c] pt-2.5 flex justify-between text-sm sm:text-base font-bold mb-5">
          <span>FINAL SETTLEMENT:</span>
          <span id="receipt-grand-total" className="text-[#1a1816]">
            {formatCents(receiptTotalInCents)}
          </span>
        </div>

        <button
          ref={dismissBtnRef}
          type="button"
          onClick={onClose}
          id="dismiss-receipt-btn"
          className="dismiss-receipt-btn w-full bg-[#221f1c] hover:bg-[#332f2a] text-[#faf6ee] border-none py-3 px-4 font-mono text-xs font-bold cursor-pointer transition-colors shadow-sm"
        >
          CLOSE RECEIPT &amp; RESET PACK
        </button>
      </div>
    </div>
  );
}
