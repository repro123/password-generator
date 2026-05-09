import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function PasswordHistoryModal() {
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
      <DialogContent className="bg-grey-900" showCloseButton={false}>
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
          className="-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4"
        >
          {Array.from({ length: 10 }).map((_, index) => (
            <p key={index} className="mb-4 leading-normal">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exeedcnjknwd ewdkshcn ewdsbcw
              ewdscibnwsx xxscxweinsc wedsicne dscwekjdsc b ercitation ullamco
              laboris enim ad minim veniam, quis nostrud exeedcnjknwd ewdkshcn
              ewdsbcw ewdscibnwsx xxscxweinsc wedsicne dscwekjdsc rcitation
              ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
              irure dolor in reprehenderit in voluptate velit rejdsawsa
              wedshxwniskadx eiwhkdscnwedskc iewdushcnwejkdsc ewdkfshcniedsc
              esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
              occaecat cupidatat non proident, sunt in culpa qui officia
              deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua. Ut enim ad minim veniam, quis
              nostrud exeedcnjknwd ewdkshcn ewdsbcw ewdscibnwsx xxscxweinsc
              wedsicne dscwekjdsc b ercitation ullamco laboris enim ad minim
              veniam, quis nostrud exeedcnjknwd ewdkshcn ewdsbcw ewdscibnwsx
              xxscxweinsc wedsicne dscwekjdsc rcitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit rejdsawsa wedshxwniskadx
              eiwhkdscnwedskc iewdushcnwejkdsc ewdkfshcniedsc esse cillum dolore
              eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
              proident, sunt in culpa qui officia deserunt mollit anim id est
              laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exeedcnjknwd ewdkshcn
              ewdsbcw
            </p>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
