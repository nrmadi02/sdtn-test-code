import Link from "next/link";

interface Props {
  isLast: boolean;
  path?: string;
  name: string;
}

const BreadcrumbsItem = ({ isLast, name, path }: Props) => {
  return (
    <>
      {!isLast ? (
        <Link href={path || ""}>
          <span className="hover:underline">{name}</span>
        </Link>
      ) : (
        <span className="font-medium text-gray-500">{name}</span>
      )}
    </>
  );
};

export default BreadcrumbsItem;
