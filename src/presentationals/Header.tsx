import BackIcon from "@/assets/icons/arrow_back_ios.svg";
import MenuIcon from "@/assets/icons/more_vert.svg";

interface Props {
  title: string;
}

export default function Header({ title }: Props) {
  return (
    <>
      <header className="flex gap-x-5 pt-11 pb-14 pl-18 pr-12 items-center">
        <button>
          <BackIcon />
        </button>
        <h1 className="flex-1 text-left text-gray800 text-16 font-medium">
          {title}
        </h1>
        <button>
          <MenuIcon />
        </button>
      </header>
      <hr className="bg-bg" />
    </>
  );
}
