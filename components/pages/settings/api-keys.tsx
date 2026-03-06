import ApiKeyCard from "./apikey-card";
import ApiKeyForm from "@/components/forms/apikey-form";
import { useListApiKeys } from "@/hooks/use-listApiKeys";
import { Loader2 } from "lucide-react";

export default function ApiKeysTab() {
  const { isLoading, refetch, apiKeys } = useListApiKeys();
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
        {isLoading ? (
          <div className="flex flex-col gap-4 items-center py-6">
            <Loader2 className="animate-spin" />
            <p>Loading API Keys..</p>
          </div>
        ) : (
          apiKeys &&
          apiKeys.length > 0 &&
          apiKeys.map((apk) => (
            <ApiKeyCard key={apk.id} apk={apk} refetch={refetch} />
          ))
        )}
      </div>
      {/* Bottom-section */}
      <div className="bg-card sm:bg-muted sm:dark:bg-card px-2 md:bg-muted py-4 sm:p-6 lg:p-8 space-y-6  rounded-xl sm:rounded-t-none sm:rounded-b-xl">
        <div className="flex items-center gap-2 justify-between">
          {" "}
          <p className="text-xs sm:text-sm">
            Generate API keys to access your account programmatically.
          </p>
          <ApiKeyForm refetch={refetch} />
        </div>
      </div>
    </section>
  );
}
