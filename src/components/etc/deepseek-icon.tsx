import Image from "next/image";

export function DeepSeekIcon() {
  return (
    <div className="flex items-center justify-center w-4 h-4">
      <Image src="/deepseek.svg" alt="DeepSeek Icon" width={18} height={18} />
    </div>
  );
}
