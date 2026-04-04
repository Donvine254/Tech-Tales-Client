import { useState } from "react";
import { AlertTriangle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import WarningDialog from "@/components/modals/warning-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { deactivateUserAccount, deleteUserAccount } from "@/lib/actions/user";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import SuccessDialog from "@/components/modals/success-dialog";
import Link from "next/link";
import { clearUserFavorites } from "@/lib/helpers";
import ChangePassword from "./change-password";
import { useRouter } from "next/navigation";
import ActiveSessions from "./active-sessions";
import { Preferences } from "@/types";

export default function SecurityAccount({
  userId,
  email,
  preferences,
}: {
  userId: number;
  email: string;
  preferences: Preferences;
}) {
  const router = useRouter();
  return (
    <div className="py-4 sm:p-6 lg:p-8 space-y-6">
      <div className="mb-8">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
          Account & Security
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          Manage your password and account security settings
        </p>
      </div>

      <div className="space-y-6">
        {/* Change Password Form */}
        <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">
          Change Password
        </h3>
        <p className="text-xs md:text-sm text-muted-foreground font-medium">
          If you signed up using a social account, you can add email login by
          resetting the password for your primary email ({email}). If that is
          the case,{" "}
          <Link
            href="/password/reset"
            prefetch={false}
            title="Reset your password"
            className="text-blue-500 underline underline-offset-4">
            Reset Password.
          </Link>
        </p>
        <ChangePassword userId={userId} />
        <hr />
        <ActiveSessions userId={userId} />
        <hr />
        {/* Export data actions */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">
            Download your data
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Download a copy of all the information you have shared with
            Techtales. We support exports of your posts, responses and profile
            information as a zip file.
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            By initiating the process to receive these files you are
            representing that you have all necessary rights and permissions to
            receive the content included in the file.
          </p>
          <Link passHref href="/api/v1/me/export-data" download>
            <Button
              className="bg-blue-500 text-white hover:bg-blue-600 hover:text-white"
              onClick={() => toast.info("Processing export data")}>
              Export Your Data
            </Button>
          </Link>
        </div>
        {/* Account Actions */}
        <hr />
        <div>
          <h3 className="text-lg font-medium mb-4 text-destructive">
            Danger Zone
          </h3>
          <div className="p-3 sm:p-4 mb-6 rounded-lg border border-l-4 border-amber-500 bg-amber-100 dark:bg-amber-900/20 dark:border-amber-400">
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 text-amber-600 mr-2" />
              <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                Irreversible and Destructive actions
              </p>
            </div>
            <p className="text-sm mt-1 leading-relaxed text-amber-700 dark:text-amber-300">
              These actions will affect your account access. Deactivation is
              reversible, but deletion is permanent.
            </p>
          </div>

          {/* Deactivate */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            <div>
              <h4 className="font-medium  text-amber-700  dark:text-amber-400 ">
                Deactivate Account
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Temporarily disable your account. You can reactivate within 30
                days.
              </p>
            </div>
            <DeactivateButton router={router} preferences={preferences} />
          </div>

          {/* Delete */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0 mt-4">
            <div>
              <h4 className="font-medium text-destructive">Delete Account</h4>
              <p className="text-sm  text-gray-600 dark:text-gray-300">
                Permanently delete your account and all associated data.
              </p>
            </div>
            <DeleteAccountButton router={router} preferences={preferences} />
          </div>
        </div>
      </div>
    </div>
  );
}

const DeactivateButton = ({
  router,
  preferences,
}: {
  router: AppRouterInstance;
  preferences: Preferences;
}) => {
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [keepBlogs, setKeepBlogs] = useState(preferences.keep_blogs_on_delete);
  const [keepComments, setKeepComments] = useState(
    preferences.keep_comments_on_delete,
  );

  async function handleAccountDeactivation() {
    // TODO update the function to handle user preferences
    const res = await deactivateUserAccount(keepBlogs, keepComments);
    if (res.success) {
      setOpen(true);
    } else {
      toast.error(res.message);
    }
  }

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setShowDeactivateModal(true)}
        className="border-amber-300 text-amber-700 hover:bg-amber-50 dark:border-amber-600 dark:text-amber-400 dark:hover:bg-amber-900/20 md:w-32">
        <AlertTriangle className="w-4 h-4" />
        <span>Deactivate</span>
      </Button>
      <WarningDialog
        isOpen={showDeactivateModal}
        setIsOpen={setShowDeactivateModal}
        variant="warning"
        onClose={() => setShowDeactivateModal(false)}
        onConfirm={handleAccountDeactivation}
        title="Deactivate Account"
        description="Deactivating your account will temporarily disable it. You can reactivate your account by logging in within 30 days. After 30 days, your account and all associated data will be permanently deleted."
        buttonText="Deactivate"
        disabled={false}>
        <div className="space-y-4 px-2">
          <div className="flex flex-col gap-4">
            <Label
              htmlFor="keep-blogs"
              className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
              <Checkbox
                id="keep-blogs"
                checked={keepBlogs}
                onCheckedChange={(checked) => setKeepBlogs(!!checked)}
                className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
              />
              <div className="grid gap-1 font-normal">
                <p className="text-sm leading-none font-medium">
                  Keep my all blog posts
                </p>
                <p className="text-muted-foreground text-xs">
                  Retain all blog posts you&apos;ve written even after your
                  account is deleted.
                </p>
              </div>
            </Label>
            <Label
              htmlFor="keep-comments"
              className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
              <Checkbox
                id="keep-comments"
                checked={keepComments}
                onCheckedChange={(checked) => setKeepComments(!!checked)}
                className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
              />
              <div className="grid gap-1 font-normal">
                <p className="text-sm leading-none font-medium">
                  Keep my all comments
                </p>
                <p className="text-muted-foreground text-xs">
                  Preserve the comments you&apos;ve made on other blogs.
                </p>
              </div>
            </Label>
          </div>
        </div>
      </WarningDialog>
      <SuccessDialog
        isOpen={open}
        setIsOpen={setOpen}
        title="Account deactivated successfully"
        onClose={() => {
          clearUserFavorites();
          router.replace("/api/auth/logout");
        }}
        description="Your account has been deleted. A recovery link has been sent to your email incase you change your mind."
      />
    </>
  );
};

const DeleteAccountButton = ({
  router,
  preferences,
}: {
  router: AppRouterInstance;
  preferences: Preferences;
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [keepBlogs, setKeepBlogs] = useState(preferences.keep_blogs_on_delete);
  const [keepComments, setKeepComments] = useState(
    preferences.keep_comments_on_delete,
  );

  async function handleAccountDeletion() {
    const res = await deleteUserAccount(keepBlogs, keepComments);
    if (res.success) {
      setOpen(true);
    } else {
      toast.error(res.message);
    }
  }
  return (
    <>
      <Button
        variant="destructive"
        className="md:w-32"
        onClick={() => setShowDeleteModal(true)}>
        <Trash2 className="w-4 h-4" />
        <span>Delete</span>
      </Button>
      <WarningDialog
        isOpen={showDeleteModal}
        setIsOpen={setShowDeleteModal}
        variant="destructive"
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleAccountDeletion}
        title="Confirm Account Deletion"
        description="We’re sorry to see you go. Once your account is deleted, all of your content will be permanently gone, including your profile, blog posts and responses."
        buttonText="Delete Forever">
        {" "}
        <div className="space-y-4 px-2">
          <div className="flex flex-col gap-4">
            <Label
              htmlFor="keep-blogs"
              className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
              <Checkbox
                id="keep-blogs"
                checked={keepBlogs}
                onCheckedChange={(checked) => setKeepBlogs(!!checked)}
                className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
              />
              <div className="grid gap-1 font-normal">
                <p className="text-sm leading-none font-medium">
                  Keep my all blog posts
                </p>
                <p className="text-muted-foreground text-xs">
                  Retain all blog posts you&apos;ve written even after your
                  account is deleted.
                </p>
              </div>
            </Label>

            <Label
              htmlFor="keep-comments"
              className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
              <Checkbox
                id="keep-comments"
                checked={keepComments}
                onCheckedChange={(checked) => setKeepComments(!!checked)}
                className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
              />
              <div className="grid gap-1 font-normal">
                <p className="text-sm leading-none font-medium">
                  Keep my all comments
                </p>
                <p className="text-muted-foreground text-xs">
                  Preserve the comments you&apos;ve made on other blogs.
                </p>
              </div>
            </Label>
          </div>
        </div>
      </WarningDialog>
      <SuccessDialog
        isOpen={open}
        setIsOpen={setOpen}
        title="Account deleted successfully"
        onClose={() => {
          clearUserFavorites();
          router.push("/api/auth/logout");
        }}
        description="Your account has been deleted. There is no turning back now."
      />
    </>
  );
};
