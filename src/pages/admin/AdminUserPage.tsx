import { useState } from 'react';
import {
  useGetUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from '../../features/auth/userApi';
import AdminLayout from './AdminLayout';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Checkbox } from '../../components/ui/checkbox';
import { Edit, Trash } from 'lucide-react';

export default function AdminUserPage() {
  const { data: users, isLoading, isError } = useGetUsersQuery();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [formState, setFormState] = useState<any>({
    id: 0,
    username: '',
    email: '',
    phone_number: '',
    is_staff: false,
    is_active: true,
  });

  const handleOpenEdit = (user: any) => {
    setFormState(user);
    setDialogOpen(true);
  };

  const handleSave = async () => {
    try {
      await updateUser({ id: formState.id, data: formState }).unwrap();
      setDialogOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    try {
      await deleteUser(id).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading)
    return (
      <AdminLayout>
        <div className="py-20 text-center">Loading users...</div>
      </AdminLayout>
    );

  if (isError)
    return (
      <AdminLayout>
        <div className="py-20 text-center text-red-500">
          Error loading users
        </div>
      </AdminLayout>
    );

  return (
    <AdminLayout>
      <div className="container mx-auto px-2 sm:px-4 lg:px-8 py-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-200 mb-6">
          Users
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {users?.map((user) => (
            <div
              key={user.id}
              className="bg-gray-800 p-4 rounded-xl shadow-md hover:shadow-xl transition flex flex-col justify-between"
            >
              <div className="text-gray-200 font-semibold">{user.username}</div>
              <div className="text-gray-400 text-sm">{user.email}</div>
              <div className="text-gray-400 text-sm">{user.phone_number}</div>
              <div className="flex gap-2 mt-3 justify-end">
                <Button
                  size="sm"
                  variant="ghost"
                  className="flex items-center gap-1 text-yellow-500"
                  onClick={() => handleOpenEdit(user)}
                >
                  <Edit size={16} /> Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  className="flex items-center gap-1"
                  onClick={() => handleDelete(user.id)}
                >
                  <Trash size={16} /> Delete
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Edit User Modal */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-[400px] max-w-full h-fit p-4">
            <DialogHeader>
              <DialogTitle className="text-lg sm:text-xl md:text-2xl">
                Edit User
              </DialogTitle>
            </DialogHeader>
            <div className="mt-4 space-y-3">
              <Input
                value={formState.username}
                onChange={(e) =>
                  setFormState({ ...formState, username: e.target.value })
                }
                placeholder="Username"
              />
              <Input
                value={formState.email}
                onChange={(e) =>
                  setFormState({ ...formState, email: e.target.value })
                }
                placeholder="Email"
              />
              <Input
                value={formState.phone_number || ''}
                onChange={(e) =>
                  setFormState({ ...formState, phone_number: e.target.value })
                }
                placeholder="Phone Number"
              />
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={formState.is_staff}
                  onCheckedChange={(checked:boolean) =>
                    setFormState({ ...formState, is_staff: checked })
                  }
                />
                <span className="text-gray-300 text-sm">Staff/Admin</span>
              </div>
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={formState.is_active}
                  onCheckedChange={(checked:boolean) =>
                    setFormState({ ...formState, is_active: checked })
                  }
                />
                <span className="text-gray-300 text-sm">Active</span>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <Button
                className="bg-linear-to-r from-yellow-400 to-orange-500 text-white shadow-lg"
                onClick={handleSave}
              >
                Save
              </Button>
              <Button
                onClick={() => setDialogOpen(false)}
                variant="outline"
              >
                Cancel
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
