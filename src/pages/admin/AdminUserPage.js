import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useGetUsersQuery, useUpdateUserMutation, useDeleteUserMutation, } from '../../features/auth/userApi';
import AdminLayout from './AdminLayout';
import { Dialog, DialogContent, DialogHeader, DialogTitle, } from '../../components/ui/dialog';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Checkbox } from '../../components/ui/checkbox';
import { Edit, Trash } from 'lucide-react';
export default function AdminUserPage() {
    const { data: users, isLoading, isError } = useGetUsersQuery();
    const [updateUser] = useUpdateUserMutation();
    const [deleteUser] = useDeleteUserMutation();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [formState, setFormState] = useState({
        id: 0,
        username: '',
        email: '',
        phone_number: '',
        is_staff: false,
        is_active: true,
    });
    const handleOpenEdit = (user) => {
        setFormState(user);
        setDialogOpen(true);
    };
    const handleSave = async () => {
        try {
            await updateUser({ id: formState.id, data: formState }).unwrap();
            setDialogOpen(false);
        }
        catch (err) {
            console.error(err);
        }
    };
    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this user?'))
            return;
        try {
            await deleteUser(id).unwrap();
        }
        catch (err) {
            console.error(err);
        }
    };
    if (isLoading)
        return (_jsx(AdminLayout, { children: _jsx("div", { className: "py-20 text-center", children: "Loading users..." }) }));
    if (isError)
        return (_jsx(AdminLayout, { children: _jsx("div", { className: "py-20 text-center text-red-500", children: "Error loading users" }) }));
    return (_jsx(AdminLayout, { children: _jsxs("div", { className: "container mx-auto px-2 sm:px-4 lg:px-8 py-4", children: [_jsx("h1", { className: "text-2xl sm:text-3xl md:text-4xl font-bold text-gray-200 mb-6", children: "Users" }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6", children: users?.map((user) => (_jsxs("div", { className: "bg-gray-800 p-4 rounded-xl shadow-md hover:shadow-xl transition flex flex-col justify-between", children: [_jsx("div", { className: "text-gray-200 font-semibold", children: user.username }), _jsx("div", { className: "text-gray-400 text-sm", children: user.email }), _jsx("div", { className: "text-gray-400 text-sm", children: user.phone_number }), _jsxs("div", { className: "flex gap-2 mt-3 justify-end", children: [_jsxs(Button, { size: "sm", variant: "ghost", className: "flex items-center gap-1 text-yellow-500", onClick: () => handleOpenEdit(user), children: [_jsx(Edit, { size: 16 }), " Edit"] }), _jsxs(Button, { size: "sm", variant: "destructive", className: "flex items-center gap-1", onClick: () => handleDelete(user.id), children: [_jsx(Trash, { size: 16 }), " Delete"] })] })] }, user.id))) }), _jsx(Dialog, { open: dialogOpen, onOpenChange: setDialogOpen, children: _jsxs(DialogContent, { className: "sm:max-w-[400px] max-w-full h-fit p-4", children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { className: "text-lg sm:text-xl md:text-2xl", children: "Edit User" }) }), _jsxs("div", { className: "mt-4 space-y-3", children: [_jsx(Input, { value: formState.username, onChange: (e) => setFormState({ ...formState, username: e.target.value }), placeholder: "Username" }), _jsx(Input, { value: formState.email, onChange: (e) => setFormState({ ...formState, email: e.target.value }), placeholder: "Email" }), _jsx(Input, { value: formState.phone_number || '', onChange: (e) => setFormState({ ...formState, phone_number: e.target.value }), placeholder: "Phone Number" }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Checkbox, { checked: formState.is_staff, onCheckedChange: (checked) => setFormState({ ...formState, is_staff: checked }) }), _jsx("span", { className: "text-gray-300 text-sm", children: "Staff/Admin" })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Checkbox, { checked: formState.is_active, onCheckedChange: (checked) => setFormState({ ...formState, is_active: checked }) }), _jsx("span", { className: "text-gray-300 text-sm", children: "Active" })] })] }), _jsxs("div", { className: "mt-6 flex justify-end gap-2", children: [_jsx(Button, { className: "bg-linear-to-r from-yellow-400 to-orange-500 text-white shadow-lg", onClick: handleSave, children: "Save" }), _jsx(Button, { onClick: () => setDialogOpen(false), variant: "outline", children: "Cancel" })] })] }) })] }) }));
}
