import Image from "next/image";

export function DeepSeekIcon() {
  return (
    <div className="flex items-center justify-center w-8 h-8">
      <Image src="/deepseek.svg" alt="DeepSeek Icon" width={20} height={20} />
    </div>
  );
}
