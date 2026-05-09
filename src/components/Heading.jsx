import { PasswordHistoryModal } from "@/components/PasswordHistoryModal";

function Heading() {
  return (
    <div className="preset-4 md:preset-2 flex items-center justify-between">
      <h1 className="text-grey-600 capitalize">password generator</h1>
      <PasswordHistoryModal />
    </div>
  );
}

export default Heading;
