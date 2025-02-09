import infoButton from "../assets/info.svg";
import Button from "./Button";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

export function Dialog({ isOpen, onClose, message }: DialogProps) {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-[#1D283A] p-6 rounded-lg shadow-lg w-full max-w-md">
          <form>
            <div className="flex items-center">
              <img src={infoButton} alt="Info Icon" className="w-7 h-7" />
              <h1 className="text-lg ml-5 text-white font-bold">{message}</h1>
            </div>

            <div className="flex justify-end">
              <Button onClick={onClose}>
                <p className="font-bold mx-4 text-white">X</p>
                <span className="sr-only sm:not-sr-only">Cerrar</span>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
