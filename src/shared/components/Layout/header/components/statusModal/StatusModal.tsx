interface Props {
  showStatusModal: boolean;
  setShowStatusModal: (showStatusModal: boolean) => void;
}

function StatusModal({ showStatusModal, setShowStatusModal }: Props) {
  return (
    <div
      className={`w-50 h-40 absolute bottom-0 -left-51 bg-white shadow-md shadow-black/20 rounded-lg px-2 py-5 ${showStatusModal ? 'block' : 'hidden'}`}
      onMouseEnter={() => setShowStatusModal(true)}
    >
      StatusModal
    </div>
  );
}

export default StatusModal;
