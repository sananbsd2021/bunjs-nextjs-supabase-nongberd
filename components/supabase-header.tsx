import Image from "next/image";

export default function SupabaseHeader() {
  return (
    <div className="w-full">
      <Image
        src={
          "https://res.cloudinary.com/dja3yvewr/image/upload/f_auto,q_auto/ltlmlbivh6otghirszrm"
        }
        alt="Supabase Logo"
        className="object-contain"
        width={1366} 
        height={100}
      />
    </div>
  );
}
