import React, { useState } from "react";
import { Eye, EyeOff, Save, AlertTriangle, Trash2, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generatePassword } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SecurityAccount() {
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const toggleVisibility = (field: keyof typeof showPassword) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handlePasswordSuggest = () => {
    const strong = generatePassword(); // your function
    setPasswords((prev) => ({
      ...prev,
      new: strong,
      confirm: strong,
    }));
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Password change submitted");
  };
  const hasChanges =
    passwords.current.trim() !== "" ||
    passwords.new.trim() !== "" ||
    passwords.confirm.trim() !== "";
  const newMismatch =
    passwords.new && passwords.confirm && passwords.new !== passwords.confirm;

  return (
    <div className="py-4 sm:p-6 lg:p-8 space-y-8">
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
        <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">
          Change Password
        </h3>
        <form
          onSubmit={handlePasswordSubmit}
          id="password-form"
          className="space-y-4">
          {["current", "new", "confirm"].map((field) => {
            const isMismatchField =
              newMismatch && (field === "new" || field === "confirm");
            return (
              <div key={field}>
                <Label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200 capitalize">
                  {`${field} Password *`}
                </Label>
                <div className="relative">
                  <Input
                    type={
                      showPassword[field as keyof typeof showPassword]
                        ? "text"
                        : "password"
                    }
                    name={field}
                    data-field={`password-${field}`}
                    autoComplete="new-password"
                    minLength={
                      field === "new" || field === "confirm" ? 8 : undefined
                    }
                    maxLength={
                      field === "new" || field === "confirm" ? 64 : undefined
                    }
                    required
                    value={passwords[field as keyof typeof passwords]}
                    onChange={handlePasswordChange}
                    placeholder={
                      field === "confirm"
                        ? "Confirm new password"
                        : `Enter ${field} password`
                    }
                    className={`mb-1 user-invalid:border-red-500 user-invalid:focus:ring-red-500 ${
                      isMismatchField ? "border-red-500 focus:ring-red-500" : ""
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      toggleVisibility(field as keyof typeof showPassword)
                    }
                    className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                    {showPassword[field as keyof typeof showPassword] ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {isMismatchField && (
                  <p className="text-xs text-red-500">
                    Passwords do not match.
                  </p>
                )}
              </div>
            );
          })}

          <button
            type="button"
            onClick={handlePasswordSuggest}
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline mt-2 flex items-center space-x-1">
            <Wand2 className="w-4 h-4" />
            <span>Suggest a strong password</span>
          </button>

          <div className="flex space-x-2 md:space-x-4 justify-between sm:justify-end">
            <Button
              variant="outline"
              type="reset"
              disabled={!hasChanges}
              onClick={() =>
                setPasswords({ current: "", new: "", confirm: "" })
              }>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="ghost"
              disabled={!hasChanges}
              className="bg-gradient-to-tr from-blue-500 to-blue-600 hover:shadow-md hover:scale-[1.02] transition-all duration-200 ease-in-out text-white hover:text-white">
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </Button>
          </div>
        </form>

        {/* Account Actions */}
        <div className="">
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
              <h4 className="font-medium text-gray-900 dark:text-white">
                Deactivate Account
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Temporarily disable your account. You can reactivate it later.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowDeactivateModal(true)}
              className="border-amber-300 text-amber-700 hover:bg-amber-50 dark:border-amber-600 dark:text-amber-400 dark:hover:bg-amber-900/20">
              <AlertTriangle className="w-4 h-4" />
              <span>Deactivate</span>
            </Button>
          </div>

          {/* Delete */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0 mt-4">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">
                Delete Account
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Permanently delete your account and all associated data.
              </p>
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setShowDeleteModal(true)}>
              <Trash2 className="w-4 h-4" />
              <span>Delete</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Deactivate Modal */}
      <Dialog open={showDeactivateModal} onOpenChange={setShowDeactivateModal}>
        <DialogOverlay className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm dark:bg-black/70 transition-all" />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Deactivate Account</DialogTitle>
            <div className="flex items-center justify-center gap-3 !bg-amber-100 w-12 h-12 mx-auto rounded-full my-2">
              <AlertTriangle className="w-6 h-6 text-amber-600" />
            </div>
            <DialogDescription>
              Deactivating your account will temporarily disable it. You can
              reactivate your account at any time by logging back in.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="mt-4">
            <Button
              variant="outline"
              onClick={() => setShowDeactivateModal(false)}>
              Cancel
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                // Handle deactivation logic
                setShowDeactivateModal(false);
              }}
              className="border-amber-300 text-amber-700 hover:bg-amber-50 dark:border-amber-600 dark:text-amber-400 dark:hover:bg-amber-900/20">
              Deactivate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Modal */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogOverlay className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm dark:bg-black/70 transition-all" />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Account</DialogTitle>
            <div className="flex items-center justify-center gap-3 !bg-red-100 w-12 h-12 mx-auto rounded-full my-2">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <DialogDescription>
              This action is irreversible. Your account will be recoverable for
              the next 30 days. After that period, all associated data will be
              permanently deleted.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                // Handle deletion logic here
                setShowDeleteModal(false);
              }}>
              Delete Forever
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
