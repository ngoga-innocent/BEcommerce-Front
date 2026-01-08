import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from "react";
import { useGetUsersQuery, useAddUserMutation, useUpdateUserMutation, useDeleteUserMutation, } from "../../features/auth/userApi";
import AdminLayout from "./AdminLayout";
import { Dialog, DialogContent, DialogHeader, DialogTitle, } from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Checkbox } from "../../components/ui/checkbox";
import { Edit, Trash, UserPlus } from "lucide-react";
import { toast } from "react-toastify";
export default function AdminUserPage() {
    const { data: users, isLoading, isError } = useGetUsersQuery();
    const [addUser, { isLoading: addingLoading }] = useAddUserMutation();
    const [updateUser, { isLoading: updatingLoading }] = useUpdateUserMutation();
    const [deleteUser, { isLoading: deletingLoading }] = useDeleteUserMutation();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [search, setSearch] = useState("");
    const [formState, setFormState] = useState({
        id: 0,
        username: "",
        email: "",
        phone_number: "",
        password: "",
        is_staff: false,
        is_active: true,
    });
    // ---------------- FILTERED USERS ----------------
    const filteredUsers = useMemo(() => {
        if (!users)
            return [];
        return users.filter((u) => [u.username, u.email, u.phone_number]
            .filter(Boolean)
            .some((field) => field.toLowerCase().includes(search.toLowerCase())));
    }, [users, search]);
    // ---------------- OPEN EDIT ----------------
    const handleOpenEdit = (user) => {
        setIsEditing(true);
        setFormState({ ...user, password: "" });
        setDialogOpen(true);
    };
    // ---------------- OPEN NEW USER ----------------
    const handleOpenAdd = () => {
        setIsEditing(false);
        setFormState({
            username: "",
            email: "",
            phone_number: "",
            password: "",
            is_staff: false,
            is_active: true,
        });
        setDialogOpen(true);
    };
    // ---------------- SAVE ----------------
    const handleSave = async () => {
        try {
            if (isEditing) {
                await updateUser({ id: formState.id, data: formState }).unwrap();
                toast.success("User updated successfully");
            }
            else {
                await addUser(formState).unwrap();
                toast.success("User created successfully");
            }
            setDialogOpen(false);
        }
        catch (error) {
            if (error.data && error.data) {
                const errors = error.data;
                // Loop through each field error
                Object.keys(errors).forEach((field) => {
                    const messages = errors[field];
                    if (Array.isArray(messages)) {
                        messages.forEach((msg) => toast.error(`${field}: ${msg}`));
                    }
                    else {
                        // Sometimes backend sends non-array errors
                        toast.error(`${field}: ${messages}`);
                    }
                });
            }
            else {
                toast.error("Something went wrong. Try again.");
            }
        }
    };
    // ---------------- DELETE ----------------
    const handleDelete = async (id) => {
        if (!confirm("Delete this user?"))
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
    return (_jsx(AdminLayout, { children: _jsxs("div", { className: "container mx-auto px-3 sm:px-6 py-4", children: [_jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-between gap-3", children: [_jsx("h1", { className: "text-3xl font-bold text-gray-200", children: "Users" }), _jsxs("div", { className: "flex gap-3 w-full sm:w-auto", children: [_jsx(Input, { className: "bg-gray-700 text-gray-200", placeholder: "Search users...", value: search, onChange: (e) => setSearch(e.target.value) }), _jsxs(Button, { className: "bg-linear-to-r from-yellow-400 to-orange-500 text-black font-bold shadow-lg", onClick: handleOpenAdd, children: [_jsx(UserPlus, { size: 18 }), "Add User"] })] })] }), _jsx("div", { className: "grid mt-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4", children: filteredUsers.map((user) => (_jsxs("div", { className: "bg-gray-300 p-4 rounded-xl shadow-md flex flex-col justify-between", children: [_jsxs("div", { children: [_jsx("div", { className: "text-gray-900 font-semibold text-lg", children: user.username }), _jsx("div", { className: "text-gray-900 text-sm", children: user.email }), _jsx("div", { className: "text-gray-900 text-sm", children: user.phone_number })] }), _jsxs("div", { className: "flex gap-2 mt-4 justify-end", children: [_jsxs(Button, { size: "sm", variant: "ghost", className: "flex items-center gap-1 text-yellow-500", onClick: () => handleOpenEdit(user), children: [_jsx(Edit, { size: 16 }), " ", updatingLoading ? "Saving..." : "Edit"] }), _jsxs(Button, { size: "sm", variant: "destructive", className: "flex items-center gap-1", onClick: () => handleDelete(user.id), children: [_jsx(Trash, { size: 16 }), " ", deletingLoading ? "Deleting" : "Delete"] })] })] }, user.id))) }), _jsx(Dialog, { open: dialogOpen, onOpenChange: setDialogOpen, children: _jsxs(DialogContent, { className: "sm:max-w-[420px] max-w-full p-4 bg-gray-300", children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { className: "text-xl text-zinc-900 font-bold", children: isEditing ? "Edit User" : "Add New User" }) }), _jsxs("div", { className: "mt-4 space-y-3", children: [_jsx(Input, { value: formState.username, onChange: (e) => setFormState({ ...formState, username: e.target.value }), placeholder: "Username" }), _jsx(Input, { value: formState.email, onChange: (e) => setFormState({ ...formState, email: e.target.value }), placeholder: "Email" }), _jsx(Input, { value: formState.phone_number, onChange: (e) => setFormState({ ...formState, phone_number: e.target.value }), placeholder: "Phone Number" }), !isEditing && (_jsx(Input, { type: "password", value: formState.password, onChange: (e) => setFormState({ ...formState, password: e.target.value }), placeholder: "Password" })), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Checkbox, { checked: formState.is_staff, onCheckedChange: (checked) => setFormState({ ...formState, is_staff: checked }) }), _jsx("span", { className: "text-gray-900 text-sm", children: "Staff / Admin" })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Checkbox, { checked: formState.is_active, onCheckedChange: (checked) => setFormState({ ...formState, is_active: checked }) }), _jsx("span", { className: "text-gray-900 text-sm", children: "Active" })] })] }), _jsxs("div", { className: "mt-6 flex justify-end gap-2", children: [_jsx(Button, { className: "bg-linear-to-r from-yellow-400 to-orange-500 text-black shadow-lg", onClick: handleSave, children: isEditing ? "Save" : "Create" }), _jsx(Button, { variant: "outline", onClick: () => setDialogOpen(false), children: "Cancel" })] })] }) })] }) }));
}
