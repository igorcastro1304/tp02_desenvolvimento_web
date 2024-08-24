import React from "react";

export default function Modal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "5px",
          textAlign: "center",
        }}
      >
        <p>Tem certeza de que deseja excluir este produto?</p>
        <button onClick={onConfirm}>Confirmar</button>
        <button onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
}
