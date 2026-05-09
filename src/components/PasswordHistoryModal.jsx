import { PasswordHistoryTable } from "@/components/PasswordHistoryTable";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function PasswordHistoryModal({
  history,
  onDelete,
  onGenerateSimilar,
  onDeleteAll,
}) {
  return (
    <Dialog>
      <DialogTrigger
        render={
          <button
            type="button"
            className="bg-brand-success border hover:bg-black hover:text-brand-success p-2 cursor-pointer transition-all duration-300 text-sm"
          >
            View History
          </button>
        }
      />
      <DialogContent
        className="bg-grey-900 border border-brand-success sm:max-w-3xl"
        showCloseButton={false}
      >
        <DialogHeader className="border-b border-b-white pb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-white">
              Generated Password History
            </DialogTitle>{" "}
            <DialogClose
              render={
                <button className="border border-brand-success bg-brand-success hover:bg-black hover:text-brand-success text-black px-2 cursor-pointer">
                  Close
                </button>
              }
            />
          </div>

          <DialogDescription className="text-grey-200">
            View the past passwords generated on this device.
          </DialogDescription>
        </DialogHeader>
        <div
          tabIndex={0}
          className="-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4 text-white"
        >
          <PasswordHistoryTable
            history={history}
            onDelete={onDelete}
            onGenerateSimilar={onGenerateSimilar}
            onDeleteAll={onDeleteAll}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
