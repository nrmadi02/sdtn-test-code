import { type IUser } from "@/types";

interface Props {
  user: IUser | undefined;
}

const ViewUserSection = ({ user }: Props) => {
  return (
    <div className="mt-10 grid w-full grid-cols-1 gap-5 md:grid-cols-3">
      <div className="col-span-1 flex flex-col items-center justify-center">
        <img
          className="h-[200px] w-[200px] rounded-full"
          src={
            user?.avatar
              ? user.avatar !== "string"
                ? user.avatar
                : `https://ui-avatars.com/api/?name=${user.name
                    .split(" ")
                    .join("+")}`
              : `https://ui-avatars.com/api/?name=${(user?.name || "")
                  .split(" ")
                  .join("+")}`
          }
          alt="_image"
        />
      </div>
      <div className="col-span-1 md:mr-10 min-h-[200px] rounded-lg border-[1px] border-gray-300 border-opacity-50 p-5 shadow-md md:col-span-2">
        <h1 className="text-[24px] font-bold">{user?.name}</h1>
        <p className="mt-2 text-[14px] text-gray-400">{user?.bio}</p>
      </div>
    </div>
  );
};

export default ViewUserSection;
