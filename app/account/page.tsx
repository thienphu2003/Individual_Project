import Header from "@/components/Header";

const Account = () => {
  return (
    <div className="bg-neutral-900 w-full h-full overflow-hidden overflow-y-auto rounded-lg">
      <Header className="from-bg-neutral-900">
        <div className="mb-2 flex flex-col gap-y-6">
          <h1 className="text-white text-3xl font-semibold">
            Account Settings
          </h1>
        </div>
      </Header>
    </div>
  );
};

export default Account;
