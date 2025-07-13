
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Settings2 } from 'lucide-react';

interface UserRoleManagerProps {
  userId: string;
  currentRole: string;
  userName: string;
  onRoleChange: (userId: string, newRole: string) => void;
}

const UserRoleManager = ({ userId, currentRole, userName, onRoleChange }: UserRoleManagerProps) => {
  const [selectedRole, setSelectedRole] = useState(currentRole);
  const [isOpen, setIsOpen] = useState(false);

  const roles = [
    { value: 'Admin', label: 'Admin', description: 'Full access to all features' },
    { value: 'Member', label: 'Member', description: 'Can upload and manage own content' },
    { value: 'Viewer', label: 'Viewer', description: 'Can only view content' },
  ];

  const handleSave = () => {
    onRoleChange(userId, selectedRole);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Settings2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change User Role</DialogTitle>
          <DialogDescription>
            Update the role for {userName}. This will change their permissions in the family archive.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Role</label>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((role) => (
                  <SelectItem key={role.value} value={role.value}>
                    <div className="flex flex-col">
                      <span className="font-medium">{role.label}</span>
                      <span className="text-xs text-gray-500">{role.description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserRoleManager;
