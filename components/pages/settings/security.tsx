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
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

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
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Security & Account
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Manage your password and account security settings
        </p>
      </div>

      <div className="space-y-8">
        {/* Change Password Form */}
        <div className="p-4 sm:p-6 rounded-lg border bg-gray-50 border-gray-200 dark:bg-gray-700 dark:border-gray-600">
          <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">
            Change Password
          </h3>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            {["current", "new", "confirm"].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200 capitalize">
                  {field === "confirm"
                    ? "Confirm New Password"
                    : `${field} Password`}
                </label>
                <div className="relative">
                  <input
                    type={
                      showPassword[field as keyof typeof showPassword]
                        ? "text"
                        : "password"
                    }
                    name={field}
                    value={passwords[field as keyof typeof passwords]}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-3 pr-10 rounded-lg border bg-white dark:bg-gray-600 text-gray-900 dark:text-white border-gray-300 dark:border-gray-500 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder={
                      field === "confirm"
                        ? "Confirm new password"
                        : `Enter ${field} password`
                    }
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
              </div>
            ))}
            <button
              type="button"
              onClick={handlePasswordSuggest}
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline mt-2 flex items-center space-x-1">
              <Wand2 className="w-4 h-4" />
              <span>Suggest a strong password</span>
            </button>

            <div className="flex justify-end">
              <Button type="submit" className="flex items-center space-x-2">
                <Save className="w-4 h-4" />
                <span>Update Password</span>
              </Button>
            </div>
          </form>
        </div>

        {/* Account Actions */}
        <div className="p-4 sm:p-6 rounded-lg border bg-gray-50 border-gray-200 dark:bg-gray-700 dark:border-gray-600">
          <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">
            Account Actions
          </h3>
          <div className="p-3 sm:p-4 mb-6 rounded-lg border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-400">
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2" />
              <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                Warning: Account Actions
              </p>
            </div>
            <p className="text-sm mt-1 leading-relaxed text-yellow-700 dark:text-yellow-300">
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
              className="border-yellow-300 text-yellow-700 hover:bg-yellow-50 dark:border-yellow-600 dark:text-yellow-400 dark:hover:bg-yellow-900/20">
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
              onClick={() => setShowDeleteModal(true)}
              className="flex items-center space-x-2">
              <Trash2 className="w-4 h-4" />
              <span>Delete</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Deactivate Modal */}
      <Dialog open={showDeactivateModal} onOpenChange={setShowDeactivateModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Deactivate Account</DialogTitle>
            <DialogDescription>
              <div className="flex items-start gap-3 mt-2">
                <AlertTriangle className="w-6 h-6 text-yellow-600 mt-0.5" />
                <p className="text-gray-600 dark:text-gray-300">
                  Are you sure you want to deactivate your account? You can
                  reactivate it at any time.
                </p>
              </div>
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
              className="border-yellow-300 text-yellow-700 hover:bg-yellow-50 dark:border-yellow-600 dark:text-yellow-400 dark:hover:bg-yellow-900/20">
              Deactivate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Modal */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Account</DialogTitle>
            <DialogDescription>
              <div className="flex items-start gap-3 mt-2">
                <Trash2 className="w-6 h-6 text-red-600 mt-0.5" />
                <p className="text-gray-600 dark:text-gray-300">
                  This action cannot be undone. All your data will be
                  permanently deleted.
                </p>
              </div>
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
