
import ApiKeyCard from "./apikey-card";
import ApiKeyForm from "@/components/forms/apikey-form";
import type { ApiKey } from "@/types";
// import { listUserApiKeys } from "@/data/api-key";

export default function ApiKeysTab() {
//   const data = await listUserApiKeys();
const data = [] as ApiKey[]
  return (
    <section>
      <div className="py-4 sm:p-6 lg:p-8 space-y-6">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
            API Keys
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Manage your API keys for secure access. API Keys can be used to
            create, edit and delete blogs, or access private user information.
          </p>
        </div>
        {/* Display for API Keys */}
        {data &&
          data?.length > 0 &&
          data.map((apk) => <ApiKeyCard key={apk.id} apk={apk} />)}
      </div>
      {/* Bottom-section */}
      <div className="bg-card sm:bg-muted sm:dark:bg-card px-2 md:bg-muted py-4 sm:p-6 lg:p-8 space-y-6  rounded-xl sm:rounded-t-none sm:rounded-b-xl">
        <div className="flex items-center gap-2 justify-between">
          {" "}
          <p className="text-xs sm:text-sm">
            Generate API keys to access your account programmatically.
          </p>
          <ApiKeyForm />
        </div>
      </div>
    </section>
  );
}