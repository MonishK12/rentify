import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const DeleteUserDialog = ({ userID }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setLoading(true);
    setError("");
    console.log(userID)
    try {
      const res = await fetch(`/api/addproperty/${userID}`, {
        method: "DELETE",
      });

      if (res.ok) {
        // Handle successful deletion (e.g., refresh the page or update state)
        setIsOpen(false);
      } else {
        const data = await res.json();
        setError("Failed to delete the property.");
      }
    } catch (err) {
      setError("Error during deletion: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="sm" onClick={() => setIsOpen(true)}>
            Delete
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. Are you sure you want to delete this property?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={loading}>
              {loading ? "Deleting..." : "Yes, delete it"}
            </Button>
          </DialogFooter>
          {error && (
            <div className="mt-2 text-sm text-red-600">
              {error}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteUserDialog;
