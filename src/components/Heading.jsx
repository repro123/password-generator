import { PasswordHistoryModal } from "@/components/PasswordHistoryModal";

function Heading({ history, onDelete, onGenerateSimilar, onDeleteAll }) {
  return (
    <div className="preset-4 md:preset-2 flex items-center justify-between">
      <h1 className="text-grey-600 capitalize">password generator</h1>
      <PasswordHistoryModal
        history={history}
        onDelete={onDelete}
        onGenerateSimilar={onGenerateSimilar}
        onDeleteAll={onDeleteAll}
      />
    </div>
  );
}

export default Heading;
